import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Tree.stories';

const { Custom } = composeStories(stories);

type TreeItemElementInterface = HTMLLIElement | HTMLAnchorElement;

test('All TreeItem component children of the TreeItemList component have role="treeitem".', () => {
  const component = render(<Custom {...Custom.args} />);
  const treeItems: TreeItemElementInterface[] = component.queryAllByRole(
    'treeitem'
  ) as TreeItemElementInterface[];
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  const listElements: NodeListOf<TreeItemElementInterface> =
    treeItemList.querySelectorAll('li');
  expect(
    Array.from(listElements).findIndex(
      (n) => n.getAttribute('role') !== 'treeitem'
    )
  ).toBe(-1);
  expect(treeItems.length === listElements.length).toBeTruthy();
});

test('Only one treeitem element in the tree has tabindex="0".', () => {
  const component = render(<Custom {...Custom.args} />);
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  expect(treeItemList.querySelectorAll(`[tabIndex='0']`).length).toBe(1);
});

test('All treeitem elements are focusable.', () => {
  const component = render(<Custom {...Custom.args} />);
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  const listElements: NodeListOf<TreeItemElementInterface> =
    treeItemList.querySelectorAll('li');
  expect(treeItemList.querySelectorAll(`[tabIndex='-1']`).length).toBe(
    Array.from(listElements).length - 1
  );
});

test('Focus movement in the Tree component is managed with a roving tabindex; when the user moves focus, the element included in the tab sequence changes to the element with focus.', () => {
  const component = render(<Custom {...Custom.args} />);
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  expect(treeItemList.childElementCount).toBeGreaterThan(1);
  const previousFocusedTreeItem: TreeItemElementInterface =
    treeItemList?.firstElementChild as TreeItemElementInterface;
  previousFocusedTreeItem.focus();
  expect(previousFocusedTreeItem.tabIndex).toBe(0);
  userEvent.keyboard('{Tab}');
  const nextFocusedTreeItem: TreeItemElementInterface =
    document.activeElement as TreeItemElementInterface;
  expect(nextFocusedTreeItem.tabIndex).toBe(0);
  expect(previousFocusedTreeItem.id !== nextFocusedTreeItem.id).toBeTruthy();
});

test('When the Tree component focuses after losing focus, the previously focused treeitem element retains the 0 tabindex.', () => {
  const component = render(<Custom {...Custom.args} />);
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  const previousFocusedTreeItem: TreeItemElementInterface =
    treeItemList?.firstElementChild as TreeItemElementInterface;
  previousFocusedTreeItem.focus();
  previousFocusedTreeItem.blur();
  expect(document.activeElement !== previousFocusedTreeItem).toBeTruthy();
  userEvent.keyboard('{Tab}');
  const nextFocusedTreeItem: TreeItemElementInterface =
    treeItemList.querySelector(`[tabIndex='0']`) as TreeItemElementInterface;
  expect(previousFocusedTreeItem.id === nextFocusedTreeItem.id).toBeTruthy();
});

test('The Tree component can render a list of HTMLLIElement TreeItem components.', () => {
  const component = render(<Custom {...Custom.args} />);
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  //TODO: Traverse the root input to test all treeitem element tags individually
  const listItemElements = treeItemList.querySelectorAll('li');
  expect(listItemElements).not.toBeNull();
  expect(treeItemList.querySelector('a')).toBeNull();
  for (let i = 0; i < listItemElements.length; i++) {
    const element: TreeItemElementInterface = listItemElements[
      i
    ] as TreeItemElementInterface;
    expect(element.getAttribute('role')).toBe('treeitem');
  }
});

test('The Tree component can render a list of HTMLAnchorElement TreeItem components.', () => {
  const component = render(<Custom anchors {...Custom.args} />);
  const treeItemList: HTMLUListElement = component.getByTestId(
    'tree-item-list-root'
  ) as HTMLUListElement;
  //TODO: Traverse the root input to test all treeitem element tags individually
  const anchorElements: NodeListOf<HTMLAnchorElement> =
    treeItemList.querySelectorAll('a');
  expect(anchorElements).not.toBeNull();
  expect(treeItemList.querySelector('li')).toBeNull();
  for (let i = 0; i < anchorElements.length; i++) {
    const element: HTMLAnchorElement = anchorElements[i] as HTMLAnchorElement;
    expect(element.getAttribute('role')).toBe('treeitem');
  }
});
