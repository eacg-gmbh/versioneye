function init_plots(){require(["/assets/libs/d3.v3.min","/assets/plots/timebar"],function(e,t){console.debug("Plot dependencies are now loaded."),timebar1=new t({selector:"#plot_latest",width:595,height:140});var n=jQuery("#language").data("language");timebar1.loadAndRender("/package/latest/timeline30.json?lang="+n),timebar1=new t({selector:"#plot_novel",width:595,height:80}),timebar1.loadAndRender("/package/novel/timeline30.json?lang="+n)})}function init_newsfeed(e){var t=$(e).data("feeds").split(","),n=_.range(1,t.length+1),i=_.object(n,t);return jQuery(e).feeds({max:10,feeds:i,loadingTemplate:function(){var e="<strong>Loading</strong> Currently importing latest news.";return e},entryTemplate:function(t){var n=_.template(jQuery(e+"-item-template").html());return n({entry:t})}}),!0}jQuery(document).ready(function(){_.templateSettings={interpolate:/\{\{\=(.+?)\}\}/g,evaluate:/\{\{(.+?)\}\}/g},jQuery("#language-newsfeed").length&&(console.debug("Initializing language newsfeed."),init_newsfeed("#language-newsfeed")),jQuery("#plot_latest").length&&init_plots()});