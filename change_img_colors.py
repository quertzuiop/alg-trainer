import xml.etree.ElementTree as ET
from xml.dom import minidom
import os

# loop over files in oll_img
for filename in os.listdir('oll_img'):
    if filename.endswith('.svg'):
        doc = minidom.parse('oll_img/' + filename)
        for tile in doc.getElementsByTagName('rect'):
            style = tile.getAttribute('style')
            if 'fill:#ffff32ff;' in style:
                tile.setAttribute('style', style.replace('fill:#ffff32ff;', 'fill:#ad8ced;'))

        with open('oll_img/' + filename, 'w') as f:
            f.write(doc.toxml())