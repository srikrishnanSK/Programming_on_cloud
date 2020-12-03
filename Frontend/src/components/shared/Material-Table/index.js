import React, { useEffect, useRef } from "react";
import MaterialTable from "material-table";
import queryString from "query-string";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FilterListIcon from "@material-ui/icons/FilterList";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { connect } from "react-redux";
import { Chip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

import "./materil-table.scss";

function LivePreviewExample(props) {
  let { columns, data, loading } = props;

  let history = useHistory();

  let tableRef = useRef();

  useEffect(init, []);

  function init() {
    constructColumns();
    updateTableEntries();
  }

  function updateTableEntries() {
    let searchParams = queryString.parse(history.location.search);
    if (searchParams.entries) {
      tableRef.current.dataManager.pageSize = Number(searchParams.entries);
      // setPageSize(Number(searchParams.entries));
    } else {
      tableRef.current.dataManager.pageSize = 10;
    }
  }

  function constructColumns() {
    columns.forEach((column) => {
      if (column.title === "Actions") {
        column.render = renderActions;
      } else if (column.title === "Status") {
        if (props.entity === "Patents") {
          column.render = renderPatentStatus;
        } else if (props.entity === "Bills") {
          column.render = renderBillStatus;
        } else {
          column.render = renderStatus;
        }
      } else if (column.field === "goods") {
        column.render = renderGoods;
      }
    });
  }

  function renderBillStatus(rowData) {
    let color = "";
    let status = rowData.status;
    if (status === "Received") {
      color = "green";
    } else if (status === "Pending") {
      color = "red";
    } else if (status === "Partial") {
      color = "orange";
    } else if (status === "Bad debts") {
      color = "purple";
    }
    return <Chip className={color} label={status} color="primary" />;
  }

  function renderPatentStatus(rowData) {
    let color = "";
    let status = rowData.status;
    if (status === "Granted") {
      color = "green";
    } else if (status === "Pending") {
      color = "liteBlue";
    } else if (status === "FER Replied") {
      color = "liteGreen";
    } else if (status === "Examination") {
      color = "purple";
    } else if (status === "Published") {
      color = "skyblue";
    } else {
      color = "blue";
    }
    return <Chip className={color} label={status} color="primary" />;
  }

  function renderStatus(rowData) {
    let color = "";
    let status = rowData.status || rowData.oppositionStatus;
    if (status === "Showcause Hearing" || status === "Hearing") {
      color = "orange";
    } else if (status === "Registered" || status === "Granted") {
      color = "green";
    } else if (status === "Accepted" || status === "FER Replied") {
      color = "liteGreen";
    } else if (status === "New Application") {
      color = "liteBlue";
    } else if (status === "Pleadings Complete" || status === "Examination") {
      color = "purple";
    } else if (status === "Pending") {
      color = "red";
    } else if (status === "Published") {
      color = "skyblue";
    } else {
      color = "blue";
    }
    return <Chip className={color} label={status} color="primary" />;
  }
  function renderGoods(rowData) {
    return (
      <>
        {rowData.goods !== "NA" ? (
          <Tooltip title={rowData.goods} arrow>
            <div className="goods">{rowData.goods}</div>
          </Tooltip>
        ) : (
          <div className="goods">{rowData.goods}</div>
        )}
      </>
    );
  }

  function renderActions(rowData) {
    return (
      <div>
        <EditIcon
          onClick={() => props.handleAction(rowData, "edit")}
          style={{ marginRight: "8px", cursor: "pointer" }}
        />
        <VisibilityIcon
          style={{ cursor: "pointer" }}
          onClick={() => props.handleAction(rowData, "preview")}
        />
      </div>
    );
  }

  function handleEntriesChange(updatedEntries) {
    let searchParams = queryString.parse(history.location.search);
    searchParams.entries = updatedEntries;
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(searchParams),
    });
    // setPageSize(updatedEntries);
  }

  return (
    <>
      <section className="materil-table">
        <MaterialTable
          className="mat-table"
          tableRef={tableRef}
          columns={columns}
          data={data}
          options={{
            sorting: true,
            toolbar: false,
            search: false,
            pageSizeOptions: [10, 50, 100, 200],
            cellStyle: {
              fontSize: "13px",
              padding: "5px 16px",
              // width: 10,
              // maxWidth: 10,
              cellStyle: { wordBreak: "break-all" },
            },
            headerStyle: {
              padding: "3px 16px",
              // width: 10,
              // maxWidth: 10,
              cellStyle: { wordBreak: "break-all" },
              backgroundColor: " #4a5a9a",
              borderRadius: "0 !important",
              color: "white",
            },
          }}
          onChangeRowsPerPage={handleEntriesChange}
          isLoading={loading}
          icons={{
            Filter: FilterListIcon,
            PreviousPage: ChevronLeftIcon,
            NextPage: ChevronRightIcon,
            FirstPage: FirstPageIcon,
            LastPage: LastPageIcon,
            SortArrow: ArrowUpwardIcon,
          }}
        />
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.tableReducer.loading,
  };
};

export default connect(mapStateToProps)(LivePreviewExample);
