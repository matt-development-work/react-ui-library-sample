import React, { KeyboardEvent, ReactNode, useState } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Tree, TreeNode, TreeProps } from './Tree';
import Card from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faFileCode,
  faFlask,
  faFolder,
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
const folderIcon: IconProp = faFolder as IconProp;
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

type PreIndexedTreeNode = {
  children?: PreIndexedTreeNode[];
  icon?: ReactNode;
  id?: number;
  value: string;
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
          icon={folderIcon}
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
          icon={folderIcon}
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
          icon={folderIcon}
          className={'text-amber-300'}
          size="sm"
        />
      ),
      children: [
        {
          value: 'components',
          icon: (
            <FontAwesomeIcon
              icon={folderIcon}
              className={'text-amber-300'}
              size="sm"
            />
          ),
          children: [
            {
              value: 'Listbox',
              icon: (
                <FontAwesomeIcon
                  icon={folderIcon}
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
                  icon={folderIcon}
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
                  icon={folderIcon}
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
                  icon={folderIcon}
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
    <div className="absolute h-5/6">
      <Card
        className={`relative max-h-full pr-5 ring-1 ring-emerald-400 bg-slate-700 overflow-y-${
          !focusing ? 'scroll' : 'hidden'
        }`}
        hoverElevation="xl"
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>): false | void =>
          [' ', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(
            e.key
          ) && setFocusing(true)
        }
        onKeyUp={(): false | void => focusing && setFocusing(false)}
      >
        <Tree {...args} />
      </Card>
    </div>
  );
};

export const Custom: Story<TreeProps> = Template.bind({});

Custom.args = {
  root: customTreeNodeData as TreeNode,
};
