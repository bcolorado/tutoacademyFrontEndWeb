import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/horizontalNav.css";
import logo from "../../assets/logo.png";
import SearchBar from "@mkyy/mui-search-bar";
import { useQuery } from "@apollo/client";
import {
  FIND_PROFILE_QUERY,
  GET_PRODUCTS_QUERY,
} from "../../utilities/graphQl";
import { ProfileResult } from "./profileResult";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import aliados from '../../assets/aliados.png'
import Divider from '@mui/material/Divider';

function HorizontalNav() {
  const [searchValue, setSearchValue] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useQuery(FIND_PROFILE_QUERY, {
    variables: { value: searchValue },
  });
 
  const searchRef = useRef(null);

  const search = (value) => {
    setSearchValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else if (data) {
      setSearchResults(data.findProfiles);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchValue("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const {data: data2,loading: loading2,error: error2,} = useQuery(GET_PRODUCTS_QUERY);
  if ( loading2) return <p>Loading...</p>;
  if ( error2) return <p>Error :</p>;
  

  return (
    <>
      <div className="horizontal-nav">
        <img src={logo} alt="Logo" />
        <SearchBar
          className="stylesSearchbar"
          placeholder="Buscar..."
          width="100%"
          onChange={search}
          onFocus={search}
        />

        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{
            width: "10%",
            backgroundColor: "rgba(240, 158, 0, 0.6)",
            color: "#000000",
            height: "30px",
            fontWeight: "bold",
            fontSize: 15,
            alignSelf: "center",
            marginLeft: "60vw",
            transform: "translateY(-60px)",
          }}
        >
          Aliados 
        </Button>
      </div>

      <div ref={searchRef} className="search-results">
        {data &&
          data.findProfiles &&
          searchResults &&
          searchResults.map((data) => (
            <div
              key={data?.userID.googleId}
              style={{ marginBottom: "10px", width: "400px" , marginLeft:'10px', marginTop:'5px'}}
              className="hoverable-div"
            >
              <ProfileResult data={data} />
              <Divider sx={{marginTop:'5px'}}></Divider>
            </div>
            
          ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ borderBottom: '1px solid #ccc' }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Avatar
            style={{ width: "50%", height: "15%" }}
            src={aliados}
            alt="Aliados"
            variant="rounded"
          />
          <h2 style={{ marginTop: "10px", fontSize: '30px' }}>Productos de aliados</h2>
        </div>
       
      </DialogTitle>
      <DialogContent style={{ maxHeight: "325px", overflow: "auto" }}>
        {data2.getSourcelambdaProducts.length > 0 ? (
          data2.getSourcelambdaProducts.map((product) => (
            <div
              key={product.title}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{ width: "80px", height: "80px" }}
                src={product.image}
                alt={product.title}
              />
              <h3>{product.title}</h3>
              <p>
                Precio:{" "}
                {product.price.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </p>
              <p>Unidades: {product.units}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default HorizontalNav;
