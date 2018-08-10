from __future__ import print_function

# Copyright 2016-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
# http://aws.amazon.com/apache2.0/
# or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

#import json
import boto3
#import http.client
#import re
import socket


###### Configuration

ecs_clusters = []
check_health_active = False
check_health_path = '/health'
domain = '.ve.eacg.intern.'

####################

print('Loading function')

route53 = boto3.client('route53')
ecs = boto3.client('ecs')
ec2 = boto3.client('ec2')
response = route53.list_hosted_zones_by_name(DNSName=domain[:1])
if len(response['HostedZones']) == 0:
    raise Exception('Zone not found')
hostedZoneId = response['HostedZones'][0]['Id']

def get_ip_port(rr):
    try:
        ip = socket.gethostbyname(rr['Value'].split(' ')[3])
        return [ip, rr['Value'].split(' ')[2]]
    except:
        return [None, None]

def check_health(ip, port):
#    try:
#        conn = http.client.HTTPConnection(ip, int(port), timeout=2)
#        conn.request("GET", check_health_path)
#        r1 = conn.getresponse()
#        if r1.status != 200:
#            return "ERROR"
#   except:
#        return "ERROR"
    return ""

def search_ecs_instance(ip, list_ec2_instances):
    for ec2Instance in list_ec2_instances:
        if list_ec2_instances[ec2Instance]['privateIP'] == ip:
            return list_ec2_instances[ec2Instance]['instanceArn']

def search_task(port, ec2Instance, service, list_tasks):
    for task in list_tasks:
        if list_tasks[task]['instance'] == ec2Instance and {'service': service, 'port': port} in list_tasks[task]['containers']:
            return task

def search_ecs_task(ip, port, service, ecs_data):
    ec2Instance = search_ecs_instance(ip, ecs_data['ec2Instances'])
    if ec2Instance != None:
        task = search_task(port, ec2Instance, service, ecs_data['tasks'])
        if task != None:
            return task

def delete_route53_record(record, comment):
    route53.change_resource_record_sets(
        HostedZoneId=hostedZoneId,
        ChangeBatch={
            'Comment': comment,
            'Changes': [
                {
                    'Action': 'DELETE',
                    'ResourceRecordSet': record
                }
            ]
        })

def upsert_route53_record(record, comment):
    print("upsert_route53_record: ")
    print(record)
    result = route53.change_resource_record_sets(
        HostedZoneId=hostedZoneId,
        ChangeBatch={
            'Comment': comment,
            'Changes': [
                {
                    'Action': 'UPSERT',
                    'ResourceRecordSet': record
                }
            ]
        })
    print (result)

def create_route53_record(record, comment):
    print("create_route53_record: ")
    print(record)
    result = route53.change_resource_record_sets(
        HostedZoneId=hostedZoneId,
        ChangeBatch={
            'Comment': comment,
            'Changes': [
                {
                    'Action': 'CREATE',
                    'ResourceRecordSet': record
                }
            ]
        })
    print (result)

def process_records_srv(response, ecs_data):
    ## cleanup + reccord found
    services = {'services': []}
    for record in response['ResourceRecordSets']:
        if record['Type'] == 'SRV':
            for rr in record['ResourceRecords']:
                [ip, port] = get_ip_port(rr)
                print("IP %s found" % ip)
                if ip != None:
                    task=search_ecs_task(ip, port, '.'.join(record['Name'].split('.')[0:2]), ecs_data)
                    print('Task: ')
                    print(task)
                    if task == None:
                        delete_route53_record(record, 'Service Discovery Health Check failed')
                        print("Record %s deleted" % rr)
                        break

                    if check_health_active:
                        result = "Initial"
                        retries = 3
                        while retries > 0 and result != None:
                            result = check_health(ip, port)
                            retries -= 1
                        if result != None:
                            delete_route53_record(record, 'Service Discovery Health Check failed')
                            print("Record %s deleted" % rr)
                            if task != None:
                                ecs.stop_task(
                                    cluster=ecs_data['instanceArns'][ecs_data['tasks'][task]['instance']]['cluster'],
                                    task=task,
                                    reason='Service Discovery Health Check failed'
                                )
                                print("Task %s stopped" % task)
        elif record['Type'] == 'A':
            if 'ResourceRecords' in record:
                for rr in record['ResourceRecords']:
                    if (ecs_data['clusterPrivateIPs'].count(rr['Value']) == 0) and (record['Name'] == ('ip-' + rr['Value'].replace('.', '-') + '.' + domain + '.')):
                        delete_route53_record(record, 'Instance no longer exists in cluster')
                        print("Record %s deleted" % rr['Value'])
                        break
                    elif ecs_data['clusterPrivateIPs'].count(rr['Value']) > 1:
                        print("ERROR: IP %s exists on multiple cluster instances" % rr['Value'])
                        break
                    elif ecs_data['clusterPrivateIPs'].count(rr['Value']) == 1:
                        print("IP {} / Service {} exists on cluster instances".format(rr['Value'], record['Name']))
                        services['services'].append(record['Name'])
                        break

    for arn, task in ecs_data['tasks'].items():
        instance = task['instance']
        instanceId = ecs_data['instanceArns'][instance]
        ip = ecs_data['ec2Instances'][instanceId['instanceId']]['privateIP']
        sname = task['containers'][0]['service']
        fullsname = sname + domain
        port = task['containers'][0]['port']

        print("Service {} known = {}".format(fullsname, services['services'].count(fullsname)))

        if services['services'].count(fullsname) > 0:
            resourceRecord = { "ResourceRecords":[{"Value": ip}],"Type": "A", "Name": fullsname, "TTL": 30}
            upsert_route53_record(resourceRecord, "Service " + sname + " updated")
            print("--> EXISTING IP {} / Name {} / Port {}".format(ip, sname, port))
        else:
            resourceRecord = { "ResourceRecords":[{"Value": ip}],"Type": "A", "Name": fullsname, "TTL": 30}
            create_route53_record(resourceRecord, "Service " + sname + " registered")
            print("--> NEW IP {} / Name {} / Port {}, Record = {}".format(ip, sname, port, resourceRecord))

    if response['IsTruncated']:
        if 'NextRecordIdentifier' in response.keys():
            new_response = route53.list_resource_record_sets(
                HostedZoneId=hostedZoneId,
                StartRecordName=response['NextRecordName'],
                StartRecordType=response['NextRecordType'],
                StartRecordIdentifier=response['NextRecordIdentifier'])
        else:
            new_response = route53.list_resource_record_sets(
                HostedZoneId=hostedZoneId,
                StartRecordName=response['NextRecordName'],
                StartRecordType=response['NextRecordType'])
        process_records_srv(new_response, ecs_data)

def get_definition_for_container(name, containerDefinitions):
    for containerDefinition in containerDefinitions:
        if containerDefinition['name'] == name:
            return containerDefinition

def get_service_for_port(port, environment):
    for env in environment:
        name_eval = env['name'].split("_")
        if len(name_eval) == 3 and name_eval[0] == "SERVICE" and name_eval[1] == port and name_eval[2] == "NAME":
            return env['value']

    return ""

def get_ecs_data():
    list_ec2_instances = {}
    list_ecs_private_ips = []
    list_instance_arns = {}
    list_tasks = {}
    for cluster_name in ecs_clusters:
        response = ecs.list_container_instances(cluster=cluster_name)
        for instance_arn in response['containerInstanceArns']:
            list_instance_arns[instance_arn] = {'cluster': cluster_name}
        if len(list_instance_arns.keys()) > 0:
            response = ecs.describe_container_instances(
                cluster=cluster_name,
                containerInstances=list(list_instance_arns.keys()))
            for instance in response['containerInstances']:
                list_ec2_instances[instance['ec2InstanceId']] = {'instanceArn': instance['containerInstanceArn']}
                list_instance_arns[instance['containerInstanceArn']]['instanceId'] = instance['ec2InstanceId']
            if len(list_ec2_instances.keys()) > 0:
                response = ec2.describe_instances(InstanceIds=list(list_ec2_instances.keys()))
                for reservation in response['Reservations']:
                    for instance in reservation['Instances']:
                        list_ec2_instances[instance['InstanceId']]['privateIP'] = instance['PrivateIpAddress']
                        list_ecs_private_ips.append(instance['PrivateIpAddress'])
        #print('Container Instances: ')
        #print(list_ec2_instances)
        #print('Container PrivIds: ')
        #print(list_ecs_private_ips)
        response = ecs.list_tasks(cluster=cluster_name, desiredStatus='RUNNING')
        #print('List-Task: ')
        #print(response)
        if len(response['taskArns']) > 0:
            responseTasks = ecs.describe_tasks(cluster = cluster_name, tasks = response['taskArns'])
            for task in responseTasks['tasks']:
                list_tasks[task['taskArn']] = {'instance': task['containerInstanceArn'], 'containers': []}
                responseDefinition = ecs.describe_task_definition(taskDefinition=task['taskDefinitionArn'])
                #print('Task: ')
                #print(task)
                for container in task['containers']:
                    containerDefinition = get_definition_for_container(container['name'], responseDefinition['taskDefinition']['containerDefinitions'])
                    for networkBinding in container['networkBindings']:
                        #print('networkBinding: ')
                        #print(networkBinding)
                        service = container['name'] #get_service_for_port(networkBinding['containerPort'], containerDefinition['environment'])
                        #print('service: ')
                        #print(service)
                        if service != "":
                            list_tasks[task['taskArn']]['containers'].append({'service': service, 'port': networkBinding['hostPort']})

        return {'instanceArns': list_instance_arns, 'ec2Instances': list_ec2_instances, 'tasks': list_tasks, 'clusterPrivateIPs': list_ecs_private_ips}

#def lambda_handler(event, context):
print('Starting')

if len(ecs_clusters) == 0:
    response = ecs.list_clusters()
    for cluster in response['clusterArns']:
        ecs_clusters.append(cluster)

#print ('ecs_clusters: ')
#print (ecs_clusters)
response = route53.list_resource_record_sets(HostedZoneId=hostedZoneId)
print ('route53 record sets: ')
print (response)
print ('\n')

ecs_data = get_ecs_data()

#print('ecs_data: ')
#print(ecs_data)

process_records_srv(response, ecs_data)

print('Service Discovery Health Check finished')
    #return 'Service Discovery Health Check finished'
