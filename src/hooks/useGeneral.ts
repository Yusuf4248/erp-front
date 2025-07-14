import type { TablePaginationConfig } from "antd";
import type { PaginationParams } from "@types";
import { useNavigate } from "react-router-dom";

export const useGeneral = () => {
  const useTablePagination = ({
    pagination,
    setParams,
  }: {
    pagination: TablePaginationConfig;
    setParams: (params: PaginationParams) => void;
  }) => {
    const navigate = useNavigate();
    const handlePagination = () => {
      setParams({
        page: pagination.current ?? 1,
        limit: pagination.pageSize ?? 5,
      });
      const searchParams = new URLSearchParams();
      searchParams.set("page", String(pagination.current ?? 1));
      searchParams.set("limit", String(pagination.pageSize ?? 5));
      navigate({ search: `?${searchParams.toString()}` });
    };
  };

  return {
    useTablePagination,
  };
};

// import { useNavigate } from "react-router-dom";
// import { type PaginationConfig } from "@types";

// export const useGeneral = ()=>{
//     const navigate = useNavigate()
//     const handlePagination =({pagination, setParams}: PaginationConfig)=>{
//     const (current, pageSize) = pagination
//     setParams ({
//         page:current!,
//         limit: pageSize!
//     })
//     const searchParams = new URLSearchParams()
//     searchParams.set("page", current!.toString())
//     searchParams.set("limit", pageSize!.toString())
//     navigate({search:`?${searchParams.toString()}`})
//     }

//     return {
//         handlePagination
//     }
// }
