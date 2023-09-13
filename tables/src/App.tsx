import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  VirtualTable,
} from "@devexpress/dx-react-grid-bootstrap4";

import {
  DataTypeProvider,
  IntegratedSorting,
  SortingState,
  PagingState,
  CustomPaging,
} from "@devexpress/dx-react-grid";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import "./App.css";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const GridTable = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-sm table-styled" />
);

const getPosts = async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 0,
    limit: 10,
    totalCount: 100,
  });

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const gridColumns = [
    { name: "id", title: "id звонка" },
    { name: "body", title: "body" },
    { name: "title", title: "title" },
    { name: "userId", title: "userId", align: "right" },
  ];

  const tableColumnExtensions = [
    { columnName: "id", width: 100 },
    { columnName: "body", width: 650 },
    { columnName: "title", width: 600 },
    { columnName: "userId", width: 300 },
  ];

  // const paging = {
  //   currentPage: 0,
  //   limit: 10,
  //   totalCount: 100,
  // };

  const setPage = (page) => {
    console.log("page", page);
  };

  const PagingPanelProps = {
    totalPages: 0,
    currentPage: 0,
    onCurrentPageChange: (page: number) => null,
    pageSize: 0,
    totalCount: 0,
    onPageSizeChange: (size: number) => null,
    pageSizes: [0],
    getMessage: () => "",
  };

  const pPanel = ({ ...restProps }) => {
    // @ts-ignore
    return <PagingPanel.Container {...restProps} className="epmty-panel" />;
  };

  const Root = (props) => (
    <Grid.Root
      {...props}
      style={{ height: "100%" }}
      className="table-styled-virtual-root"
    />
  );

  return (
    <div>
      App
      <Grid rows={posts} columns={gridColumns} rootComponent={Root}>
        <PagingState
          currentPage={paging.currentPage}
          onCurrentPageChange={(page) => setPage(page)}
          pageSize={paging.limit}
        />
        <CustomPaging totalCount={paging.totalCount} />
        <SortingState />
        <IntegratedSorting />
        {/* <Table
          tableComponent={GridTable}
          columnExtensions={tableColumnExtensions}
        /> */}
        <VirtualTable
          // tableComponent={GridLOL}
          // height="auto"
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls={false} />
        <PagingPanel containerComponent={pPanel} />
      </Grid>
    </div>
  );
}

export default App;
