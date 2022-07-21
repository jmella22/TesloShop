import React, { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { CartContext, UIContext } from "../../context";

export const Navbar = () => {
  const router = useRouter();
  const { toogleSideMenu } = useContext(UIContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const activeLink = (url: string) => {
    return url === router.asPath ? "primary" : "info";
  };

  const onSearchterm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
    setSearchTerm("");
    setIsSearchVisible(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchVisible(false);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} passHref>
          <Link display={"flex"} alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        {isSearchVisible ? (
          ""
        ) : (
          <Box sx={{ display: { xs: "none", sm: "block" } }} className="fadeIn">
            <NextLink href={"/category/men"} passHref>
              <Link>
                <Button color={activeLink("/category/men")}>Hombres</Button>
              </Link>
            </NextLink>
            <NextLink href={"/category/women"} passHref>
              <Link>
                <Button color={activeLink("/category/women")}>Mujeres</Button>
              </Link>
            </NextLink>
            <NextLink href={"/category/kid"} passHref>
              <Link>
                <Button color={activeLink("/category/kid")}>Niños</Button>
              </Link>
            </NextLink>
          </Box>
        )}
        <Box flex={1} />
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchterm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={clearSearch}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
          >
            <SearchOutlined />
          </IconButton>
        )}
        <IconButton
          sx={{ display: { sm: "none" } }}
          onClick={toogleSideMenu}
          className="fadeIn"
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href={"/cart"} passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toogleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
