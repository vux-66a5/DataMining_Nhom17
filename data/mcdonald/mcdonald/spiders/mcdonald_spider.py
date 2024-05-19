import scrapy
import re

class McdonaldSpiderSpider(scrapy.Spider):
    name = "mcdonald_spider"
    start_urls = ['https://mcdonalds.vn/mccafe/thuc-uong-da-xay']

    def parse(self, response):
        items = response.css('div.tbox-item-middle')
        for item in items:
            image_url = item.css('img::attr(src)').get()
            name = item.css('p.tname-food-combo-carousel::text').get()
            price = item.css('p.tname-food-combo-carousel b::text').get()

            if image_url and name and price:
                # Loại bỏ "VNĐ" và chuyển đổi thành số nguyên
                price = int(re.sub(r'\D', '', price))

                yield {
                    'image_url': response.urljoin(image_url),
                    'name': name.strip(),
                    'price': price,
                }