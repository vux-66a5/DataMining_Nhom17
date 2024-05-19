# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

import scrapy
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem
from unidecode import unidecode
import re

class McdonaldImagesPipeline(ImagesPipeline):

    def get_media_requests(self, item, info):
        yield scrapy.Request(item['image_url'], meta={'item': item})

    def file_path(self, request, response=None, info=None, *, item=None):
        item = request.meta['item']
        image_guid = request.url.split('/')[-1].split('.')[0]  # original image file name
        name = item['name']

        # Chuyển đổi tên sản phẩm thành dạng slug
        slug_name = unidecode(name).lower()
        slug_name = re.sub(r'[^a-z0-9]+', '-', slug_name)
        slug_name = slug_name.strip('-')

        return f'thuc-uong/{slug_name}.png'

    def item_completed(self, results, item, info):
        if not results or not results[0][0]:
            raise DropItem(f"Failed to download image {item['image_url']}")

        item['image_path'] = results[0][1]['path']
        return item
