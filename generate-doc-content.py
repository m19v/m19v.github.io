import os
from pathlib import Path
from datetime import datetime
import json

CONTENT_HEADER = '''---
title: Content
slug: "/"
sidebar_position: 1
---

Published on January 05, 2022  
Updated on {0}

<!---
<div class="contentTableContainer">

|     | Title                                                 | Date Last Updated |
| --- | ----------------------------------------------------- | ----------------- |
| 1   | [Item One](#)                                         | Month Day, Year   |
| 2   | [Item Two](#)                                         | Month Day, Year   |

</div>
-->

'''.format(datetime.now().strftime("%B %d, %Y"))


def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path, x)) for x in os.listdir(path)]
        print(d['children'])
    else:
        d['type'] = "file"
    return d


def get_label_of_dir(path):
    f = Path(f'{path}/_category_.json')
    if os.path.isfile(f):
        with open(f, encoding="utf8") as file:
            d = json.load(file)
            return d['label']


def get_label_of_md_x(basedir, filename):
    f = Path(f'{basedir}/{filename}')
    with open(f, "r", encoding="utf8") as file:
        for ln in file:
            if ln.startswith("title:"):
                return ln[6:]


def path_to_tree(path):
    """Generates content.md
    Parameters
    ----------
    path : Path
        the path to be scanned
    """
    with open(Path(f'{path}/content.md'), 'w', encoding='utf-8') as f:
        f.write(CONTENT_HEADER)
        for root, dirs, files in os.walk(path):
            # cut path from root and count folder level by os.separator. Omit root folder (i.e. '-1')
            relative_root_path = root.replace(str(path), '')
            level = relative_root_path.count(os.sep) - 1
            indent = ' ' * 4 * level
            label_of_dir = get_label_of_dir(root)
            if label_of_dir is not None:
                f.write('{}- [{}]({})\n'.format(
                    indent,
                    label_of_dir,
                    'docs/category/' + os.path.basename(root)))
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                if (file.endswith("md") or file.endswith("mdx")) and file != "content.md":
                    f.write('{}- [{}]({})\n'.format(
                        subindent,
                        get_label_of_md_x(root, file).strip(),
                        'docs' + relative_root_path.replace(os.sep, '/') + "/" + os.path.splitext(file)[0]))


if __name__ == '__main__':
    docs_path = Path(f'{Path.cwd()}/docs')
    path_to_tree(docs_path)
    # with open('contents.json', 'w', encoding='utf-8') as f:
    #     json.dump(path_to_dict(docs_path), f, ensure_ascii=False, indent=4)
