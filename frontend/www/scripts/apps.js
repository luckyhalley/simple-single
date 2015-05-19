$(function(){
	/*************************     Model     *************************/
	var AppArticle = Backbone.Model.extend({	
		urlRoot: 'http://local.lottery-backend.com/api/get_article_detail/id/',
		defaults : {
		   id: 0,
		   title: '',
		   date: new Date,
		   content: ''
		}
	});	
	
	var AppArticles = Backbone.Collection.extend({
		model: AppArticle,
		url: 'http://local.lottery-backend.com/api/get_article_list'
	});

	/*************************     View     *************************/	
	var appListView = Backbone.View.extend({
		tagName:  "li",
		template: _.template($('#list-template').html()),
		initialize: function(){
			var view = this;
			this.collection = new AppArticles;
			this.collection.fetch({
				success: function(){
					view.render();
				}
			});
		},
		render: function(){	
			var view = this;
			_(this.collection.models).each(function(article) {
                $(".help-list").append(view.template(article.attributes));
            });
		}
	});

	var appDetailView = Backbone.View.extend({
		tagName:  "div",
		template: _.template($('#detail-template').html()),
		initialize: function(){
			$(".detail-container").empty();
			var view = this;
			this.model = new AppArticle({id: this.id});
			this.model.fetch({
				success: function(){
					view.render();
				}
			});
		},
		render: function(){
			$(".detail-container").append(this.template(this.model.attributes));
		}
	});

	/*************************  Controller  *************************/	
	var AppRoutes = Backbone.Router.extend({
		routes: {
			"": "getList",
			"help": "getList",
			"help-detail/:query/:page": "getDetail",
			":page": "pageRouter"
		},
		getList: function(){
			if(this.view == null)  this.view =  new appListView;
			this.pageRouter('help');
		},
		getDetail: function(query, page){
			this.view =  new appDetailView({id: page});
			this.pageRouter('help-detail');
		},
		pageRouter: function(page) {
			var currentPage = $('.page[page-role="'+page+'"]');
			currentPage.show().siblings().hide();
		}
	});

	var approute = new AppRoutes;
	Backbone.history.start();








	
	/*************************  Touch  *************************/	
	var links = $('.help-list a');
	links.each(function(){
		$(this).on('touchstart', function(){
			$(this).addClass('active');
		}).on('touchend', function(){
			$(this).removeClass('active');
		});
	});
});

