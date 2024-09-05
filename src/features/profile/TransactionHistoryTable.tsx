import { Table } from "antd";
import { Transaction } from "@/models/transaction.type";
import { TablePaginationConfig, TableProps } from "antd";

interface TransactionHistoryTableProps {
  dataSource: Transaction[];
  loading: boolean;
  paginationProps: false | TablePaginationConfig | undefined;
  handleTableChange: TableProps<Transaction>["onChange"];
}

function TransactionHistoryTable({
  dataSource,
  loading,
  paginationProps,
  handleTableChange,
} : TransactionHistoryTableProps)  {
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "id",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Ngày",
      dataIndex: "transactionDate",
      key: "transactionDate",
    },
    {
      title: "Loại giao dịch",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={paginationProps}
      onChange={handleTableChange}
      rowKey="id"
    />
  );
}

export default TransactionHistoryTable;
