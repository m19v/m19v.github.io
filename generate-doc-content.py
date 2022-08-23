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

---

- Awesome
- Book Summaries
- Cheat-Sheet
  - Automation
  - CICD
  - Cloud
  - Container
  - DevOps Linux
  - Network
  - Scripting
  - Security
  - Windows
- Engineering Mathematics
  - Numerical analysis
- Internet of Things
  - Home Automation
  - Raspberry Pi
- Tools
- Tutorials
  - Bash
  - Java
  - Python

---
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
            level = root.replace(path, '').count(os.sep)
            indent = ' ' * 4 * level
            # print('{}- {}/'.format(indent, os.path.basename(root)), file=f)
            f.write('{}- {}\n'.format(indent, os.path.basename(root)))
            subindent = ' ' * 4 * (level + 1)
            for file in files:
                # print('{}- {}'.format(subindent, file), file=f)
                f.write('{}- {}\n'.format(subindent, file))


if __name__ == '__main__':
    docs_path = Path(f'{Path.cwd()}/docs')
    path_to_tree(str(docs_path))
    # with open('contents.json', 'w', encoding='utf-8') as f:
    #     json.dump(path_to_dict(docs_path), f, ensure_ascii=False, indent=4)