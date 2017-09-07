hubble.getXML('http://cn.engadget.com/rss.xml', function (error, response, $) {
	$('item').each(function (index, value) {

		var url = $(this).find('link').text();
		var key = url.substring(url.lastIndexOf('.com/') + 5).trim();
		var dom = $(this);

		articles.get('key', key, function (article) {
			if (article) {
				return;
			}

			var title   = dom.find('title').text().trim();
			var summary = dom.find('description').text().replace(/<\/?[^>]*>/g, '').trim();

			hubble.getHtml(url, function (error, response, $) {
				var content = $('figure').html();
				content += '<div>' + content.find('.article-text').eq(0).html() + '</div>';

				var article = {
					title: title,
					content: content,
					summary: summary,
					url: url
				};
				articles.append(article);
			});
		});
	});
});
