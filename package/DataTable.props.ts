import type {
  CollapseProps,
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineShadow,
  MantineSize,
  MantineTheme,
  Sx,
  TableProps,
} from '@mantine/core';
import type { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';

export type DataTableColumnTextAlignment = 'left' | 'center' | 'right';
export type DataTableVerticalAlignment = 'top' | 'center' | 'bottom';

export type DataTableOuterBorderProps =
  | {
      withBorder?: never;
      borderRadius?: never;
    }
  | {
      /**
       * If true, table will have border
       */
      withBorder: boolean;

      /**
       * Table border radius
       */
      borderRadius?: MantineNumberSize;
    };

export type DataTableEmptyStateProps =
  | {
      /**
       * Content to show when no records are available; the provided content
       * will be overlaid and centered automatically
       */
      emptyState?: ReactNode;

      noRecordsIcon?: never;
    }
  | {
      emptyState?: never;

      /**
       * Icon to show when no records are available
       */
      noRecordsIcon?: ReactNode;
    };

export type DataTablePaginationProps =
  | {
      page?: never;
      onPageChange?: never;
      totalRecords?: never;
      recordsPerPage?: never;
      paginationColor?: never;
      paginationSize?: never;
      loadingText?: never;
      paginationText?: never;
    }
  | {
      /**
       * Current page number (1-based); if provided, a pagination component is shown
       */
      page: number;

      /**
       * Callback fired after change of each page
       */
      onPageChange: (page: number) => void;

      /**
       * Total number of records in the dataset
       */
      totalRecords: number | undefined;

      /**
       * Number of records per page
       */
      recordsPerPage: number;

      /**
       * Pagination component size; defaults to `sm`
       */
      paginationSize?: MantineSize;

      /**
       * Pagination component color; defaults to primary theme color
       */
      paginationColor?: MantineColor;

      /**
       * Text to show while records are loading
       */
      loadingText?: string;

      /**
       * Pagination text; defaults to ```({ from, to, totalRecords }) => `${from}-${to}/${totalRecords}`
       * ```
       */
      paginationText?: (options: { from: number; to: number; totalRecords: number }) => ReactNode;
    };

export type DataTableColumn<T> = {
  /**
   * Column accessor; you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`)
   */
  accessor: string;

  /**
   * Optional column header title; if not present, one will be generated by "humanizing"
   * the provided column accessor
   * (i.e. `firstName` -> `First name`; `user.firstName` -> `User first name`)
   */
  title?: ReactNode;

  /**
   * Custom cell data render function accepting the current record and its index in `records`
   */
  render?: (record: T, index: number) => ReactNode;

  /**
   * Column text alignment; defaults to `left`
   */
  textAlignment?: DataTableColumnTextAlignment;

  /**
   * If true, column will be sortable
   */
  sortable?: boolean;

  /**
   * Desired column width
   */
  width?: string | number;

  /**
   * If true, cell content in this column will be truncated with ellipsis as needed
   */
  ellipsis?: boolean;

  /**
   * If true, column will not be visible
   */
  hidden?: boolean;

  /**
   * If set, the column will only be visible according to the specified media query
   */
  visibleMediaQuery?: string | ((theme: MantineTheme) => string);

  /**
   * Optional class name passed to the column title
   */
  titleClassName?: string;

  /**
   * Optional style passed to the column title
   */
  titleStyle?: CSSProperties;

  /**
   * Optional style passed to the column title; see https://mantine.dev/styles/sx/
   */
  titleSx?: Sx;

  /**
   * Optional class name passed to each data cell in the column; can be a string or a function
   * receiving the current record and its index as arguments and returning a string
   */
  cellsClassName?: string | ((record: T, recordIndex: number) => string | undefined);

  /**
   * Optional style passed to each data cell in the column; can be a CSS properties object or
   * a function receiving the current record and its index as arguments and returning a CSS properties object
   */
  cellsStyle?: CSSProperties | ((record: T, recordIndex: number) => CSSProperties | undefined);

  /**
   * Optional style passed to each data cell in the column; see https://mantine.dev/styles/sx/
   */
  cellsSx?: Sx;
};

export type DataTableCellClickHandler<T> = (params: {
  /**
   * Clicked record
   */
  record: T;
  /**
   * Clicked record index
   */
  recordIndex: number;
  /**
   * Clicked column information
   */
  column: DataTableColumn<T>;
  /**
   * Clicked column index
   */
  columnIndex: number;
}) => void;

export type DataTableSortStatus = {
  /**
   * Sort column accessor; you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`)
   */
  columnAccessor: string;

  /**
   * Sort direction; `asc` for ascending or `desc` for descending
   */
  direction: 'asc' | 'desc';
};

export type DataTableSortProps =
  | {
      sortStatus?: never;
      onSortStatusChange?: never;
    }
  | {
      /**
       * Current sort status (sort column accessor & direction)
       */
      sortStatus: DataTableSortStatus;

      /**
       * Callback fired after change of sort status
       */
      onSortStatusChange?: (sortStatus: DataTableSortStatus) => void;
    };

export type DataTableSelectionProps<T> =
  | {
      selectedRecords?: never;
      onSelectedRecordsChange?: never;
      isRecordSelectable?: never;
    }
  | {
      /**
       * Currently-selected records
       */
      selectedRecords: T[];

      /**
       * Callback fired when selected records change
       */
      onSelectedRecordsChange?: (selectedRecords: T[]) => void;

      /**
       * A function used to determine whether a certain record is selectable;
       * if the function returns false, the row selection checkbox is disabled
       */
      isRecordSelectable?: (record: T, index: number) => boolean;
    };

export type DataTableContextMenuItemProps =
  | {
      /**
       * Unique item key
       */
      key: string;
    } & (
      | {
          /**
           * If true, insert an actions divider
           */
          divider: true;
          icon?: never;
          title?: never;
          color?: never;
          hidden?: never;
          disabled?: never;
          onClick?: never;
        }
      | {
          divider?: never;
          /**
           * Item icon
           */
          icon?: ReactNode;

          /**
           * Item title; if not present, one will be generated by "humanizing"
           * the provided item key
           * (i.e. `viewRecord` -> `View record`)
           */
          title?: ReactNode;

          /**
           * Item color
           */
          color?: MantineColor;

          /**
           * if true, the menu item will not be shown
           */
          hidden?: boolean;

          /**
           * if true, the menu item will be disabled
           */
          disabled?: boolean;

          /**
           * Function to call when the menu item is clicked
           */
          onClick: () => void;
        }
    );

export type DataTableContextMenuProps<T> = {
  /**
   * Context menu trigger; defaults to `rightClick` for classic behavior
   */
  trigger?: 'rightClick' | 'click';

  /**
   * Menu z-index; defaults to `3`
   */
  zIndex?: number;

  /**
   * Menu border radius; defaults to `xs`
   */
  borderRadius?: MantineNumberSize;

  /**
   * Menu shadow; defaults to `sm`
   */
  shadow?: MantineShadow;

  /**
   * Boolean or a function accepting the current record and its index as arguments and returning a boolean value;
   * if true, the menu will not be shown
   */
  hidden?: boolean | ((record: T, recordIndex: number) => boolean);

  /**
   * Function accepting the current record and its index as arguments and returning the row menu items
   */
  items: (record: T, recordIndex: number) => DataTableContextMenuItemProps[];
};

export type DataTableRowExpansionCollapseProps = Pick<
  CollapseProps,
  'animateOpacity' | 'transitionDuration' | 'transitionTimingFunction'
>;

export type DataTableRowExpansionProps<T> = {
  /**
   * Defines when rows should expand; defaults to `click`
   */
  trigger?: 'click' | 'always' | 'never';

  /**
   * If true, multiple rows can be expanded at the same time
   */
  allowMultiple?: boolean;

  /**
   * Function defining which records will be initially expanded;
   * does nothing if `trigger === 'always'`
   */
  initiallyExpanded?: (record: T, recordIndex: number) => boolean;

  /**
   * Additional properties passed to the Mantine Collapse component wrapping the custom content
   */
  collapseProps?: DataTableRowExpansionCollapseProps;

  /**
   * An object defining the row expansion behavior in controlled mode
   */
  expanded?: {
    /**
     * Currently expanded record IDs
     */
    recordIds: unknown[];

    /**
     * Callback fired when expanded records change;
     * receives an array containing the newly expanded record IDs
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRecordIdsChange: Dispatch<SetStateAction<any[]>> | ((recordIds: unknown[]) => void);
  };

  /**
   * Function returning the custom content to be lazily rendered for an expanded row;
   * accepts the current record and a `collapse()` callback that can be used to collapse the expanded row
   */
  content: (props: { record: T; recordIndex: number; collapse: () => void }) => ReactNode;
};

export type DataTableProps<T> = {
  /**
   * Table height; defaults to `100%`
   */
  height?: string | number;

  /**
   * Minimum table height
   */
  minHeight?: string | number;

  /**
   * `DataTable` component shadow
   */
  shadow?: MantineShadow;

  /**
   * If true, columns will have vertical borders
   */
  withColumnBorders?: boolean;

  /**
   * Table border color, applied to the outer border, the header bottom border, and the pagination
   * footer top border; defaults to
   * `(theme) => (theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3])`
   */
  borderColor?: string | ((theme: MantineTheme) => string);

  /**
   * Row border color; defaults to
   * `(theme) => (theme.fn.rgba(theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3], 0.65))`
   */
  rowBorderColor?: string | ((theme: MantineTheme) => string);

  /**
   * If true, the user will not be able to select text
   */
  textSelectionDisabled?: boolean;

  /**
   * Vertical alignment for row cells; defaults to `center`
   */
  verticalAlignment?: DataTableVerticalAlignment;

  /**
   * If true, will show a loader with semi-transparent background, centered over the table
   */
  fetching?: boolean;

  /**
   * Visible columns
   */
  columns: DataTableColumn<T>[];

  /**
   * Accessor to use as unique record key; you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`);
   * defaults to `id`
   */
  idAccessor?: string;

  /**
   * Visible records; the `DataTable` component will try to infer its row type from here
   */
  records?: T[];

  /**
   * Loader size; defaults to `lg`
   */
  loaderSize?: MantineNumberSize;

  /**
   * Loader variant
   */
  loaderVariant?: MantineTheme['loader'];

  /**
   * Loader background blur (in pixels)
   */
  loaderBackgroundBlur?: number;

  /**
   * Text to show on empty state and pagination footer when no records are available
   */
  noRecordsText?: string;

  /**
   * Function to call when a row cell is clicked
   */
  onCellClick?: DataTableCellClickHandler<T>;

  /**
   * Function to call when a row is clicked, accepting the current record and its index in `records`
   */
  onRowClick?: (record: T, recordIndex: number) => void;

  /**
   * Defines a context-menu to show when user right-clicks or clicks on a row
   */
  rowContextMenu?: DataTableContextMenuProps<T>;

  rowExpansion?: DataTableRowExpansionProps<T>;
} & Pick<TableProps, 'striped' | 'highlightOnHover' | 'horizontalSpacing' | 'verticalSpacing' | 'fontSize'> &
  Omit<
    DefaultProps<'root' | 'header' | 'pagination', CSSProperties>,
    'unstyled' | 'p' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr'
  > &
  DataTableOuterBorderProps &
  DataTableEmptyStateProps &
  DataTablePaginationProps &
  DataTableSortProps &
  DataTableSelectionProps<T>;
