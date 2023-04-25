import React, { KeyboardEvent, useState } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Tree, TreeNode, TreeProps } from './Tree';
import Card from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faFileCode,
  faFlask,
  faFolder,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCss3,
  faSass,
  faGitAlt,
  faJsSquare,
  faNpm,
  faYarn,
} from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cssIcon: IconProp = faCss3 as IconProp;
const fileCodeIcon: IconProp = faFileCode as IconProp;
const flaskIcon: IconProp = faFlask as IconProp;
const closedFolderIcon: IconProp = faFolder as IconProp;
const openFolderIcon: IconProp = faFolderOpen as IconProp;
const gearIcon: IconProp = faCog as IconProp;
const gitIcon: IconProp = faGitAlt as IconProp;
const jsIcon: IconProp = faJsSquare as IconProp;
const npmIcon: IconProp = faNpm as IconProp;
const sassIcon: IconProp = faSass as IconProp;
const yarnIcon: IconProp = faYarn as IconProp;

const meta: Meta<Args> = {
  title: 'Tree',
  component: Tree,
  argTypes: {
    id: { defaultValue: 'tree' },
    title: { defaultValue: 'Tree' },
  },
};

export default meta;

type PreIndexedTreeNode = Omit<TreeNode, 'children' | 'id'> & {
  children?: PreIndexedTreeNode[];
  id?: number;
};

const addIdAttributesToTreeNodes = (
  data: PreIndexedTreeNode
): PreIndexedTreeNode | TreeNode => {
  let uniqueId: number = 0;
  const traverseTreeNodes = (node: PreIndexedTreeNode | TreeNode): void => {
    node['id'] = uniqueId;
    uniqueId += 1;
    if (!!node.children?.length) {
      let result: null | void = null;
      for (let i = 0; !result && i < node.children.length; i++) {
        result = traverseTreeNodes(node['children'][i]);
      }
    }
  };
  traverseTreeNodes(data);
  return data;
};

let customTreeNodeData: PreIndexedTreeNode | TreeNode = {
  value: 'Root',
  children: [
    {
      value: '.storybook',
      icon: (
        <FontAwesomeIcon
          icon={closedFolderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      altIcon: (
        <FontAwesomeIcon
          icon={openFolderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      children: [
        {
          value: 'main.js',
          icon: (
            <FontAwesomeIcon
              icon={jsIcon}
              className={'text-amber-400'}
              size="sm"
            />
          ),
        },
        {
          value: 'preview.js',
          icon: (
            <FontAwesomeIcon
              icon={jsIcon}
              className={'text-amber-400'}
              size="sm"
            />
          ),
        },
      ],
    },
    {
      value: 'dist',
      icon: (
        <FontAwesomeIcon
          icon={closedFolderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      altIcon: (
        <FontAwesomeIcon
          icon={openFolderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      children: [
        {
          value: 'index.js',
          icon: (
            <FontAwesomeIcon
              icon={jsIcon}
              className={'text-amber-400'}
              size="sm"
            />
          ),
        },
      ],
    },
    {
      value: 'src',
      icon: (
        <FontAwesomeIcon
          icon={closedFolderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      altIcon: (
        <FontAwesomeIcon
          icon={openFolderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      children: [
        {
          value: 'components',
          icon: (
            <FontAwesomeIcon
              icon={closedFolderIcon}
              className={'text-amber-300'}
              size="sm"
            />
          ),
          altIcon: (
            <FontAwesomeIcon
              icon={openFolderIcon}
              className={'text-amber-300'}
              size="sm"
            />
          ),
          children: [
            {
              value: 'Listbox',
              icon: (
                <FontAwesomeIcon
                  icon={closedFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              altIcon: (
                <FontAwesomeIcon
                  icon={openFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              children: [
                {
                  value: 'index.ts',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-amber-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'listbox.scss',
                  icon: (
                    <FontAwesomeIcon
                      icon={sassIcon}
                      className={'text-fuchsia-400'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Listbox.stories.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Listbox.test.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={flaskIcon}
                      className={'text-emerald-500'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Listbox.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
              ],
            },
            {
              value: 'Table',
              icon: (
                <FontAwesomeIcon
                  icon={closedFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              altIcon: (
                <FontAwesomeIcon
                  icon={openFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              children: [
                {
                  value: 'index.ts',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-amber-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'table.scss',
                  icon: (
                    <FontAwesomeIcon
                      icon={sassIcon}
                      className={'text-fuchsia-400'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Table.stories.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Table.test.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={flaskIcon}
                      className={'text-emerald-500'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Table.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
              ],
            },
            {
              value: 'Toolbar',
              icon: (
                <FontAwesomeIcon
                  icon={closedFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              altIcon: (
                <FontAwesomeIcon
                  icon={openFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              children: [
                {
                  value: 'toolbar.scss',
                  icon: (
                    <FontAwesomeIcon
                      icon={sassIcon}
                      className={'text-fuchsia-400'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Toolbar.stories.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Toolbar.test.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={flaskIcon}
                      className={'text-emerald-500'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Toolbar.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'index.ts',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-amber-100'}
                      size="sm"
                    />
                  ),
                },
              ],
            },
            {
              value: 'Treegrid',
              icon: (
                <FontAwesomeIcon
                  icon={closedFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              altIcon: (
                <FontAwesomeIcon
                  icon={openFolderIcon}
                  className={'text-amber-300'}
                  size="sm"
                />
              ),
              children: [
                {
                  value: 'index.ts',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-amber-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'treegrid.scss',
                  icon: (
                    <FontAwesomeIcon
                      icon={sassIcon}
                      className={'text-fuchsia-400'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Treegrid.stories.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Treegrid.test.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={flaskIcon}
                      className={'text-emerald-500'}
                      size="sm"
                    />
                  ),
                },
                {
                  value: 'Treegrid.tsx',
                  icon: (
                    <FontAwesomeIcon
                      icon={fileCodeIcon}
                      className={'text-emerald-100'}
                      size="sm"
                    />
                  ),
                },
              ],
            },
          ],
        },
        {
          value: 'globals.css',
          icon: (
            <FontAwesomeIcon
              icon={cssIcon}
              className={'text-sky-300'}
              size="sm"
            />
          ),
        },
        {
          value: 'setupTests.ts',
          icon: (
            <FontAwesomeIcon
              icon={fileCodeIcon}
              className={'text-emerald-500'}
              size="sm"
            />
          ),
        },
      ],
    },
    {
      value: '.gitignore',
      icon: (
        <FontAwesomeIcon icon={gitIcon} className={'text-rose-500'} size="sm" />
      ),
    },
    {
      value: 'package.json',
      icon: (
        <FontAwesomeIcon icon={npmIcon} className={'text-rose-500'} size="sm" />
      ),
    },
    {
      value: 'tailwind.config.js',
      icon: (
        <FontAwesomeIcon
          icon={fileCodeIcon}
          className={'text-amber-200'}
          size="sm"
        />
      ),
    },
    {
      value: 'tsconfig.json',
      icon: (
        <FontAwesomeIcon
          icon={gearIcon}
          className={'text-amber-400'}
          size="sm"
        />
      ),
    },
    {
      value: 'yarn.lock',
      icon: (
        <FontAwesomeIcon
          icon={yarnIcon}
          className={'text-emerald-400'}
          size="sm"
        />
      ),
    },
  ],
};

customTreeNodeData = addIdAttributesToTreeNodes(customTreeNodeData);

const Template: Story<TreeProps> = (args: TreeProps): JSX.Element => {
  const [focusing, setFocusing] = useState<boolean>(false);
  return (
    <div className="absolute left-0 top-0">
      <Card
        className={`relative pr-5 ring-1 ring-emerald-400 bg-slate-700 overflow-y-${
          !focusing ? 'scroll' : 'hidden'
        }`}
        hoverElevation="xl"
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>): false | void =>
          [' ', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(
            e.key
          ) && setFocusing(true)
        }
        onKeyUp={(): false | void => focusing && setFocusing(false)}
        square
      >
        <Tree {...args} />
      </Card>
      <span className="hidden">
        <span className="overflow-y-hidden border-opacity-0 bg-emerald-700 border-emerald-500 hover:bg-emerald-100 hover:shadow-sm border-l" />
        <span className="overflow-y-scroll hover:shadow-md border-lime-400 border-opacity-20" />
        <span className="bg-emerald-600 border-rose-600 hover:shadow-lg" />
        <span className="bg-rose-600 border-emerald-600 hover:shadow-xl" />
        <span className="border-lime-300" />
      </span>
    </div>
  );
};

export const Custom: Story<TreeProps> = Template.bind({});

Custom.args = {
  root: customTreeNodeData as TreeNode,
};
