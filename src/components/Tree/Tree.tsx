/**
 * Tree Component
 *
 * @author Matt Fagan
 *
 * NOTE: Monolithic architecture is used here to minimize the file navigation required for the reader to see the full code sample.
 *
 */
import React, {
  AnchorHTMLAttributes,
  Context,
  createContext,
  createElement,
  createRef,
  DetailedHTMLProps,
  Dispatch,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  KeyboardEvent,
  LiHTMLAttributes,
  MouseEvent,
  OlHTMLAttributes,
  ReactNode,
  RefAttributes,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type TreeNode = {
  children?: TreeNode[];
  id: number;
  value: string;
  icon?: ReactNode;
  altIcon?: ReactNode;
};

type TreeContextProps = {
  confirmFocus: (node: TreeNode, canFocus?: boolean) => void;
  data: TreeNode;
  DOMRoot: HTMLOListElement;
  focusedTreeNode: TreeNode;
  getTreeNodeWithId: (node: TreeNode, id: number) => TreeNode;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  handleSetOpenTreeItemIds: (id: number, open: boolean) => void;
  openTreeItemIds: number[];
  setData: Dispatch<SetStateAction<TreeNode>>;
  setDOMRoot: Dispatch<SetStateAction<HTMLOListElement>>;
  setFocusedTreeNode: Dispatch<SetStateAction<TreeNode>>;
  setTag: Dispatch<SetStateAction<TreeItemElementTag>>;
  setTouching: Dispatch<SetStateAction<boolean>>;
  tag: TreeItemElementTag;
  touching: boolean;
};

const TreeContext: Context<TreeContextProps> = createContext<TreeContextProps>(
  {} as TreeContextProps
);

const TreeContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [data, setData] = useState<TreeNode>({} as TreeNode);
  const [tag, setTag] = useState<TreeItemElementTag>(
    (undefined as unknown) as TreeItemElementTag
  );
  const [openTreeItemIds, setOpenTreeItemIds] = useState<number[]>([]);
  const [DOMRoot, setDOMRoot] = useState<HTMLOListElement>(
    {} as HTMLOListElement
  );
  const [focusedTreeNode, setFocusedTreeNode] = useState<TreeNode>(
    {} as TreeNode
  );
  const [touching, setTouching] = useState<boolean>(false);

  /**
   * Traverses a tree to find the node with the specified id.
   * @param {TreeNode} node - Root data.
   * @param {number} id - The id of the TreeNode to be returned.
   * @returns {TreeNode} The node with the specified id.
   */
  const getTreeNodeWithId = useCallback(
    (node: TreeNode, id: number): TreeNode => {
      let result: TreeNode = {} as TreeNode;
      if (node.id === id) {
        return node;
      } else if (!!node.children?.length) {
        for (
          let i: number = 0;
          !Object.keys(result).length && i < node.children.length;
          i++
        ) {
          result = getTreeNodeWithId(node.children[i], id);
        }
        return result;
      }
      return result;
    },
    []
  );

  /**
   * Handles TreeItem element focusing.
   * @param {TreeNode} node - The node corresponding to the TreeItem element being focused.
   * @param {boolean} [canToggle=true] - Specifies if the open state of the new focused TreeItem element will change.
   * @returns {void}
   */
  const confirmFocus = useCallback(
    (node: TreeNode = {} as TreeNode, canToggle: boolean = true): void => {
      const { id } = node;
      setFocusedTreeNode(node);
      canToggle &&
        'children' in node &&
        handleSetOpenTreeItemIds(id, openTreeItemIds.includes(id));
    },
    [openTreeItemIds]
  );

  /**
   * Sets the openTreeItemIds array with the id attributes of the open TreeItem elements when the open state of a parent node is changed.
   * @param {number} id - The id of the TreeItem element being toggled.
   * @param {boolean} open - The new open state of the TreeItem element.
   * @returns {void}
   */
  const handleSetOpenTreeItemIds = useCallback(
    (id: number, open: boolean): void => {
      const openTreeItemIdsCopy: number[] = [...openTreeItemIds];
      switch (open) {
        case true:
          openTreeItemIdsCopy.splice(openTreeItemIdsCopy.indexOf(id), 1);
          break;
        case false:
          openTreeItemIdsCopy.push(id);
          break;
      }
      setOpenTreeItemIds(openTreeItemIdsCopy);
    },
    [openTreeItemIds]
  );

  type TreeItemElementDOMProperties = {
    activeElement: Element;
    focusableTreeNodes: NodeListOf<Element> | [];
    focusableTreeNodesIds: number[];
  };
  /**
   * @returns {TreeItemElementDOMProperties} DOM properties used for TreeItem element focusing.
   */
  const getTreeItemElementDOMProperties = useCallback((): TreeItemElementDOMProperties => {
    const focusableTreeNodes: NodeListOf<Element> | [] =
      DOMRoot?.querySelectorAll(tag) ?? [];
    return {
      activeElement: document.activeElement as Element,
      focusableTreeNodes: focusableTreeNodes,
      focusableTreeNodesIds: Array.from(
        focusableTreeNodes
      ).map((n: Element): number => parseInt(n.id)),
    };
  }, [DOMRoot, tag]);

  /**
   * Gets the parent of the TreeNode with the specified id.
   * @param {number} id - The id of the child node of which to find the parent node.
   * @param {boolean} [leftArrow=false] - True if the method is invoked by a LeftArrow keyboard event.
   * @returns {TreeNode}
   */
  const getParentOfTreeNodeWithId = (
    id: number,
    leftArrow: boolean = false
  ): TreeNode => {
    const {
      activeElement,
      focusableTreeNodes,
      focusableTreeNodesIds,
    } = getTreeItemElementDOMProperties();
    let parentNode: TreeNode = {} as TreeNode;
    if (
      !leftArrow &&
      focusableTreeNodes[
        focusableTreeNodesIds.indexOf(id)
      ]?.parentElement?.getAttribute('role') === 'tree'
    ) {
      parentNode = data;
    } else {
      for (let i: number = focusableTreeNodesIds.indexOf(id) - 1; i > -1; i--) {
        if (
          DOMRoot.querySelector(
            `#tree-item-list-${focusableTreeNodes[i].getAttribute('id')}`
          )?.contains(activeElement as TreeItemElementInterface)
        ) {
          const parentId: number = parseInt(focusableTreeNodes[i].id);
          parentNode = getTreeNodeWithId(data, parentId);
          break;
        }
      }
    }
    return parentNode as TreeNode;
  };

  /**
   * Handles TreeItem element navigation and focusing.
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key } = e;
      if (['Tab', 'ArrowDown', 'ArrowUp'].includes(key)) {
        const { focusableTreeNodesIds } = getTreeItemElementDOMProperties();
        let focusedIndex: number =
          focusableTreeNodesIds.indexOf(focusedTreeNode.id) ?? 1;
        switch (key) {
          case 'Tab':
            focusedIndex = e.shiftKey ? focusedIndex - 1 : focusedIndex + 1;
            break;
          case 'ArrowDown':
            focusedIndex += 1;
            break;
          case 'ArrowUp':
            focusedIndex -= 1;
            break;
        }
        const nextFocusableTreeNodeId: number =
          focusableTreeNodesIds[focusedIndex];
        if (!nextFocusableTreeNodeId && key !== 'Tab') return;
        const nextFocusableTreeNode: TreeNode = getTreeNodeWithId(
          data,
          nextFocusableTreeNodeId
        );
        confirmFocus(nextFocusableTreeNode, false);
        return;
      } else if ([' ', 'Enter'].includes(key)) {
        const navigatedTreeNode: TreeNode = getTreeNodeWithId(
          data,
          focusedTreeNode.id
        );
        confirmFocus(navigatedTreeNode);
        return;
      } else if (['ArrowRight', 'ArrowLeft'].includes(key)) {
        const { id } = focusedTreeNode;
        const open: boolean = openTreeItemIds.includes(id);
        switch (key) {
          case 'ArrowRight':
            if ('children' in focusedTreeNode) {
              if (!open) {
                confirmFocus(focusedTreeNode);
              } else {
                const {
                  focusableTreeNodesIds,
                } = getTreeItemElementDOMProperties();
                let focusedIndex: number = focusableTreeNodesIds.indexOf(
                  focusedTreeNode.id
                );
                const nextFocusableTreeNode: TreeNode = getTreeNodeWithId(
                  focusedTreeNode,
                  focusableTreeNodesIds[focusedIndex + 1]
                );
                confirmFocus(nextFocusableTreeNode, false);
              }
            }
            break;
          case 'ArrowLeft':
            if (open) {
              confirmFocus(focusedTreeNode);
              return;
            }
            const parentNode: TreeNode = getParentOfTreeNodeWithId(id, true);
            !!parentNode.children?.length && confirmFocus(parentNode, false);
            break;
        }
        return;
      } else if (key === '*') {
        const { id } = focusedTreeNode;
        const parentNode: TreeNode = getParentOfTreeNodeWithId(id);
        const childParentNodesIds: number[] =
          parentNode?.children
            ?.filter(
              (n: TreeNode): boolean => (n.children && n.id !== id) ?? false
            )
            .map((n: TreeNode): number => n.id) ?? [];
        childParentNodesIds?.length &&
          setOpenTreeItemIds([...openTreeItemIds].concat(childParentNodesIds));
        return;
      }
      return;
    },
    [children, open, openTreeItemIds, focusedTreeNode, data]
  );

  return (
    <TreeContext.Provider
      value={{
        confirmFocus: confirmFocus,
        data: data,
        DOMRoot: DOMRoot,
        focusedTreeNode: focusedTreeNode,
        getTreeNodeWithId: getTreeNodeWithId,
        handleKeyDown: handleKeyDown,
        handleSetOpenTreeItemIds: handleSetOpenTreeItemIds,
        openTreeItemIds: openTreeItemIds,
        setData: setData,
        setDOMRoot: setDOMRoot,
        setFocusedTreeNode: setFocusedTreeNode,
        setTag: setTag,
        setTouching: setTouching,
        tag: tag,
        touching: touching,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

type TreeItemElementInterface = HTMLLIElement | HTMLAnchorElement;
type TreeItemElementTag = 'li' | 'a';
type TreeItemElementProps = {
  children: ReactNode;
  elementAttributes: {
    'aria-expanded': boolean;
    id: string;
    onClick: (
      e: MouseEvent<TreeItemElementInterface, globalThis.MouseEvent>
    ) => void;
    tabIndex: -1 | 0;
  };
  tag: TreeItemElementTag;
};

const TreeItemElement: ForwardRefExoticComponent<TreeItemElementProps &
  RefAttributes<TreeItemElementInterface>> = forwardRef<
  TreeItemElementInterface,
  TreeItemElementProps
>(
  (
    { elementAttributes, children, tag, ...props },
    ref: ForwardedRef<TreeItemElementInterface>
  ) => {
    return createElement(
      tag,
      {
        ref: ref,
        role: 'treeitem',
        ...elementAttributes,
        ...props,
      },
      children
    );
  }
);

interface AnchorElementProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}
interface ListItemElementProps extends LiHTMLAttributes<HTMLLIElement> {}
type TreeItemProps = {
  node: TreeNode;
  tag: TreeItemElementTag;
} & (AnchorElementProps | ListItemElementProps);
type TreeItemAttributes = {
  childrenListProps: TreeItemChildrenListProps;
  hasChildren: boolean;
  hasIcon: boolean;
  open: boolean;
};

const TreeItem: ForwardRefExoticComponent<TreeItemProps &
  RefAttributes<TreeItemElementInterface>> = forwardRef<
  TreeItemElementInterface,
  TreeItemProps
>(({ node, tag, ...props }, ref: ForwardedRef<TreeItemElementInterface>) => {
  const {
    confirmFocus,
    focusedTreeNode,
    openTreeItemIds,
    touching,
  } = useContext(TreeContext);
  const { id, value } = useMemo<TreeNode>(() => node, [node]);
  const focused = useMemo<boolean>(() => id === focusedTreeNode.id, [
    focusedTreeNode,
  ]);
  const inCurrentDirectory = useMemo<boolean>(
    () =>
      ((!!focusedTreeNode?.children && node === focusedTreeNode) ||
        (!focusedTreeNode?.children &&
          node.children?.includes(focusedTreeNode))) ??
      false,
    [focusedTreeNode]
  );
  const { childrenListProps, hasChildren, hasIcon, open } = useMemo<
    TreeItemAttributes
  >(() => {
    const attributes: TreeItemAttributes = {
      childrenListProps: {} as TreeItemChildrenListProps,
      hasChildren: !!node.children?.length,
      hasIcon: 'icon' in node,
      open: false,
    };
    if (!!node.children?.length) {
      attributes.childrenListProps = {
        id: id.toString(),
        inCurrentDirectory: inCurrentDirectory,
        node: node,
        parentIsFocused: focused,
        tag: tag,
      };
      attributes.open = openTreeItemIds.includes(id);
    }
    return attributes;
  }, [focused, inCurrentDirectory, openTreeItemIds]);
  return useMemo<JSX.Element>(() => {
    return (
      <Fragment>
        <TreeItemElement
          elementAttributes={{
            'aria-expanded': open,
            id: `${id}`,
            onClick: (
              e: MouseEvent<TreeItemElementInterface, globalThis.MouseEvent>
            ): void => {
              e.stopPropagation();
            },
            tabIndex: focused ? 0 : -1,
          }}
          ref={ref}
          tag={tag}
          {...props}
        >
          <span
            className={`flex px-2 focus:outline-none z-20 border border-opacity-0${
              !focused
                ? `${
                    !touching
                      ? ' hover:bg-green-600 hover:bg-opacity-40 hover:border-emerald-400 hover:border-opacity-100'
                      : ''
                  } text-white`
                : ` bg-green-600 bg-opacity-50 border-2 border-opacity-100 border-lime-400 text-lime-100`
            }`}
            onClick={(): void => {
              confirmFocus(node);
            }}
          >
            {hasChildren && (
              <i
                className={`mr-1 select-none flex items-center
                  ${
                    open
                      ? ' transform rotate-90 transition-transform ease-in-out duration-100'
                      : ''
                  }
                `}
              >
                {
                  <FontAwesomeIcon
                    className={`text-emerald-400 hover:text-lime-400 transition ease-in-out duration-200${focused &&
                      ' text-lime-300'}`}
                    icon={faAngleRight as IconProp}
                    size="sm"
                  />
                }
              </i>
            )}
            <span
              className={`select-none flex px-1 ml-${
                hasChildren ? '1' : '3'
              }${hasIcon && ' gap-x-2'}`}
            >
              {hasIcon && (
                <i className="flex items-center mr-1">
                  {!open ? node.icon : node.altIcon ?? node.icon}
                </i>
              )}
              {value}
            </span>
          </span>
          {open && tag === 'li' && (
            <TreeItemChildrenList {...childrenListProps} />
          )}
        </TreeItemElement>
        {open && tag === 'a' && <TreeItemChildrenList {...childrenListProps} />}
      </Fragment>
    );
  }, [focused, inCurrentDirectory, openTreeItemIds, touching]);
});

interface TreeItemChildrenListProps
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  id: string;
  inCurrentDirectory: boolean;
  parentIsFocused: boolean;
  node: TreeNode;
  tag: TreeItemElementTag;
}

const TreeItemChildrenList = ({
  id,
  inCurrentDirectory,
  parentIsFocused,
  node,
  tag,
  ...props
}: TreeItemChildrenListProps): JSX.Element => {
  return (
    <TreeItemList
      className={`ml-4 mt-0.5 border-l${
        inCurrentDirectory
          ? ' border-lime-400'
          : !parentIsFocused && ' border-lime-300 border-opacity-20'
      }`}
      data={node}
      id={`tree-item-list-${id}`}
      tag={tag}
      {...props}
    />
  );
};

interface TreeItemListProps
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  className?: string;
  data: TreeNode;
  root?: boolean;
  tag: TreeItemElementTag;
}

const TreeItemList = ({
  className,
  data,
  root,
  tag,
  ...props
}: TreeItemListProps): JSX.Element => {
  const { children } = useMemo<TreeNode>(() => data, [data]);
  const role = useMemo<string>(() => (root ? 'tree' : 'group'), [root]);
  const refs = useMemo<RefObject<TreeItemElementInterface>[]>(
    () =>
      children?.map(
        (): RefObject<TreeItemElementInterface> =>
          createRef<TreeItemElementInterface>()
      ) ?? [],
    []
  );
  className = useMemo<string>(() => `${className && `${className} `}`, [
    className,
  ]);
  return (
    <ol
      className={`${!root &&
        'hover:bg-emerald-600 hover:bg-opacity-20 transition ease-in-out duration-150 '}${className}flex flex-col`}
      data-testid={'tree-item-list-root'}
      role={role}
      {...props}
    >
      {children?.map(
        (n: TreeNode, i: number): JSX.Element => (
          <TreeItem key={n.id} node={n} ref={refs[i]} tag={tag} />
        )
      )}
    </ol>
  );
};

export interface TreeProps
  extends DetailedHTMLProps<
    OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  > {
  anchors?: boolean;
  children: ReactNode;
  className?: string;
  root: TreeNode;
}

const TreeContainer = ({
  anchors = false,
  root,
  ...props
}: TreeProps): JSX.Element => {
  const {
    focusedTreeNode,
    getTreeNodeWithId,
    handleKeyDown,
    setFocusedTreeNode,
    setData,
    setDOMRoot,
    setTag,
    setTouching,
    tag,
    touching,
  } = useContext(TreeContext);
  useEffect(() => {
    setData(root);
  }, [root]);
  const treeItemElementTag = useMemo<TreeItemElementTag>(
    () => (!anchors ? 'li' : 'a'),
    [anchors]
  );
  useEffect(() => {
    setTag(treeItemElementTag);
  }, [treeItemElementTag]);
  const treeContainerRef = useMemo<RefObject<HTMLDivElement>>(
    () => createRef<HTMLDivElement>(),
    []
  );
  const setZeroTabIndexOnFirstFocusableTreeItemElement = useCallback((): void => {
    const firstFocusableTreeItem: TreeItemElementInterface = treeContainerRef.current?.querySelector(
      tag
    ) as TreeItemElementInterface;
    firstFocusableTreeItem?.setAttribute('tabindex', '0');
  }, [tag]);
  useEffect(() => {
    setDOMRoot(
      treeContainerRef.current?.querySelector('ol') as HTMLOListElement
    );
    setZeroTabIndexOnFirstFocusableTreeItemElement();
  }, [tag]);
  useEffect(() => {
    const nextFocusableTreeItemElement: TreeItemElementInterface = treeContainerRef.current?.querySelector(
      `[id='${focusedTreeNode.id}']`
    ) as TreeItemElementInterface;
    nextFocusableTreeItemElement?.focus();
  }, [focusedTreeNode]);
  const mobile = useMemo<boolean>(
    () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    []
  );
  useEffect(() => {
    treeContainerRef.current?.addEventListener('touchstart', () => {
      !touching && setTouching(true);
    });
    treeContainerRef.current?.addEventListener('touchend', () => {
      if (!mobile) {
        setTimeout(() => {
          setTouching(false);
        }, 2000);
      }
    });
  }, [touching]);
  const handleFocus = (e: FocusEvent<HTMLDivElement>): void => {
    e.target.id === (e.currentTarget as any).children[0].firstElementChild?.id
      ? setFocusedTreeNode(getTreeNodeWithId(root, 1))
      : e.currentTarget.children[0].firstElementChild?.setAttribute(
          'tabindex',
          '-1'
        );
  };
  return (
    <div
      className="cursor-pointer"
      onBlur={(): void => {
        !focusedTreeNode.id && setZeroTabIndexOnFirstFocusableTreeItemElement();
      }}
      onFocus={handleFocus}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        [
          'Tab',
          'ArrowDown',
          'ArrowUp',
          ' ',
          'Enter',
          'ArrowRight',
          'ArrowLeft',
          '*',
        ].includes(e.key) && handleKeyDown(e);
      }}
      ref={treeContainerRef}
    >
      <TreeItemList
        data={root}
        root
        tag={tag ?? treeItemElementTag}
        {...props}
      />
    </div>
  );
};

export const Tree = (props: TreeProps): JSX.Element => {
  return (
    <TreeContextProvider>
      <TreeContainer {...props} />
    </TreeContextProvider>
  );
};
