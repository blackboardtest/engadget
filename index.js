hubble.getXML('http://cn.engadget.com/rss.xml', function (error, response, $) {
	$('item').each(function (index, value) {

		var url = $(this).find('link').text();
		var compenents = url.split('/');
		var id  = compenents[compenents.length-2];
		var dom = $(this);

		articles.get('id', id, function (article) {
			if (article) {
				return;
			}

			var title   = dom.find('title').text().trim();
			var summary = dom.find('description').text().replace(/<\/?[^>]*>/g, '').trim();

			hubble.getHtml(url, function (error, response, $) {
				var image   = $('#page_body').find('img').attr('src');
				var content = '<div class="img-title"><img src="' + image + '"/></div>';
				$('.article-text').each(function() {
					content += '<div class="article-text">' + $(this).html() + '</div>';
				});

				var article = {
					id: id,
					title: title,
					content: content,
					summary: summary,
					url: url,
					image : image
				};
				articles.append(article);
			});
		});
	});
});
