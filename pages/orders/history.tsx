import React from "react";
import NextLink from "next/link";
import { Button, Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100, description: "id" },
  {
    field: "fullname",
    headerName: "Nombre Completo",
    width: 300,
    description: "Nombre completo",
  },

  {
    field: "paid",
    headerName: "Estado",
    width: 200,
    description: "Infomacion si la Orden esta pagada o no",
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver Orden",
    width: 200,
    sortable: false,
    description: "Link a la orden de compra",
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`}>
          <Link>
            <Button variant="outlined" color="secondary">
              Ver orden
            </Button>
          </Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "José Mella" },
  { id: 2, paid: false, fullname: "Felipe Mella" },
  { id: 3, paid: true, fullname: "Yasna Hidalgo" },
  { id: 4, paid: false, fullname: "Claudia Riquelme" },
  { id: 5, paid: false, fullname: "Yolanda Mella" },
  { id: 6, paid: true, fullname: "Mirko Pino" },
  { id: 7, paid: true, fullname: "Matias Martinez" },
  { id: 8, paid: true, fullname: "Francisco nilo" },
  { id: 9, paid: false, fullname: "Claudia Martinez" },
  { id: 10, paid: true, fullname: "Nia Hidalgo" },
  { id: 11, paid: true, fullname: "Cristian Escobar" },
  { id: 12, paid: false, fullname: "Daniel Hidalgo" },
  { id: 13, paid: true, fullname: "Justina Mella" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de las ordenes del cliente"}
    >
      <Typography variant="h1" component={"h1"}>
        Historial de Ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          ></DataGrid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
