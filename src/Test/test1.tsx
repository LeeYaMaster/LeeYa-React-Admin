
import { ColumnDef } from "@tanstack/react-table"
import { useQuery } from '@tanstack/react-query'
import { MyTable } from "@/components/myComponents/my-table"
import axios from "axios"
import { useEffect, useState } from "react"

type MockList = {
  id: number
  name: string
  description: string
}

const columns: ColumnDef<MockList>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "description",
    header: "邮箱",
  },    
]


export default function Test1() {
    const { data = [], error, isLoading, refetch} = useQuery({
        queryKey: ['mock-list'],          // 缓存 key
        queryFn: () => fetchMockList(),           // 真正请求
        enabled: true,                               // 组件挂载即触发
      })
    const fetchMockList = async () => {
        const response = await axios.get(`/api/mock-list`)
        return response.data.list
      }
  useEffect(() => {
    
  }, [])

  return (
    <div className="container py-10">
      <h2 className="mb-4 text-2xl font-bold">用户管理</h2>
      <button onClick={() => refetch()}>手动刷新</button>
      <MyTable columns={columns} data={data} />
    </div>
  )
}