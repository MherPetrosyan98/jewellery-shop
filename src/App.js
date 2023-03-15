
import {
  Autocomplete, BottomNavigation, BottomNavigationAction, Box, Button,
  Modal, Slider, TextField, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Person3Icon from '@mui/icons-material/Person3';
import { useDispatch, useSelector } from 'react-redux';
import Appcss from "./App.module.css";
import uploadimg from "./img/upload.jpg";
import {
  getCategories, getSubcategories, addCategory, addSubcategory,
  getProducts, filterProducts, addProduct, searchProduct
} from './features/shopSlice';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';

function App() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories)
  const { subcategories } = useSelector(state => state.categories)
  const { products } = useSelector(state => state.categories)
  useEffect(() => {
    dispatch(getCategories("male"))
    dispatch(getSubcategories(1))
    dispatch(getProducts(1))
  }, [])
  const topSearch = ["gold", "white gold", "rose gold", "titanium", "silver", "bronze",
    "diamond", "sapphire", "moonstone", "paracord", "stone", "rhinestone", "amethyst"];
  const [gender, setGender] = useState('male');
  const [addCategoryGender, setAddCategoryGender] = useState("male")
  const [categoryValue, setCategoryValue] = useState(1)
  const [subcategoryValue, setSubcategoryValue] = useState(1)
  const [categoryimg, setCategoryimg] = useState(uploadimg)
  const [productImg, setProductImg] = useState(uploadimg)
  const [addCategoryName, setAddCategoryName] = useState("")
  const [addProductName, setAddProductName] = useState("")
  const [addProductPrice, setAddProductPrice] = useState()
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [zoom, setZoom] = useState("")
  const [zoomModal, setZoomModal] = useState(false)
  const [addProductModal, setAddProductModal] = useState(false)
  const [addProductDisplay, setAddProductDisplay] = useState("flex")
  const [filterPage, setFilterPage] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [filterProduct, setFilterProduct] = useState("current")


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setFilterPage({ ...filterPage, [anchor]: open });
  };

  const [filterValue, setFilterValue] = useState([200, 1000]);

  const list = (anchor) => (
    <Box
      sx={{ height: "80%", width: 300, display: "flex", alignItems: "center", justifyContent: "center" }}
      role="presentation"
    >
      <List sx={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ color: "slategrey" }}>Filter Page</h1>
        <h3 style={{ color: "steelblue" }}>Select the amount range</h3>
        <Slider
          sx={{ width: "250px" }}
          value={filterValue}
          min={5}
          max={2000}
          step={5}
          marks={[{ value: 5, label: '5$', }, { value: 2000, label: '2000$', }]}
          onChange={(event, newValue) => { setFilterValue(newValue) }}
          valueLabelDisplay={"auto"}
        />
        <ToggleButtonGroup
          sx={{ margin: "30px" }}
          orientation="vertical"
          value={filterProduct}
          exclusive
          onChange={(event, val) => {
            if (val) {
              setFilterProduct(val)
            }
          }}
        >
          <ToggleButton style={{ height: "40px", fontWeight: "bold" }} value="current" aria-label="current">
            Current products
          </ToggleButton>
          <ToggleButton style={{ height: "40px", fontWeight: "bold" }} value="all" aria-label="all">
            All products
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            setFilterPage({ ...filterPage, ["left"]: false })
            dispatch(filterProducts({ filterProduct, filterValue, subcategoryValue }))
            if (filterProduct === "all") {
              setAddProductDisplay("none")
            }

          }}
        >Apply</Button>
      </List>
    </Box>
  );
  const categoryName = categories?.map((obj) => {
    if (obj.id === categoryValue) {
      return obj.name
    }
  }).find(val => val !== undefined)

  return (
    <div className={Appcss.all}>
      <div className={Appcss.header}>
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            sx={{ width: 400, background: "whitesmoke" }}
            id="free-solo-2-demo"
            disableClearable
            selectOnFocus
            options={topSearch.map((option) => option)}
            autoHighlight
            onSelect={(e) => {
              if (topSearch.some((val) => val === e.target.value)) {
                dispatch(searchProduct(e.target.value))
                setAddProductDisplay("none")
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Stack>
        <div>
          <div>
            <Button onClick={toggleDrawer('left', true)} variant="outlined"
              sx={{ width: "40px", height: "400px", fontSize: "20px", position: "absolute", left: "15px", top: "290px" }} >
              f<br />i<br />l<br />t<br />e<br />r
            </Button>
            <Drawer
              anchor={'left'}
              open={filterPage['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </div>
        </div>
      </div>
      <div className={Appcss.categorysection}>
        <div className={Appcss.gender}>
          <ToggleButtonGroup
            orientation="vertical"
            value={gender}
            exclusive
            onChange={(event, val) => {
              if (val) {
                setGender(val)
                dispatch(getCategories(val))
              }
            }}
          >
            <ToggleButton style={{ height: "40px", fontWeight: "bold" }} value="male" aria-label="male">
              <PersonRoundedIcon />
            </ToggleButton>
            <ToggleButton style={{ height: "40px", fontWeight: "bold" }} value="female" aria-label="female">
              <Person3Icon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <BottomNavigation
          sx={{
            width: "88%",
            height: "120px",
            display: 'flex',
            alignItems: "center",
            justifyContent: 'space-between',
            background: "#E5E5E5",
            overflow: "auto"

          }}
          showLabels
          value={categoryValue}
          onChange={(event, newValue) => {
            setCategoryValue(newValue);
            dispatch(getSubcategories(newValue))
          }}
        >
          {
            categories?.map((obj) => {
              return (
                <BottomNavigationAction

                  value={obj.id}
                  key={obj.id}
                  label={obj.name}
                  icon={<img className={Appcss.img} src={obj.img} />}
                  className={Appcss.categorybox}
                  sx={{ background: "#FFFFFF", borderRadius: 2, minWidth: "150px", margin: "5px" }} />
              )
            })
          }
        </BottomNavigation>
        <div className={Appcss.addcategory}>
          <Button onClick={() => setOpen(true)} sx={{ width: "50px", height: "80px", fontSize: "25px" }}>+</Button>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false)
              setAddCategoryName("")
              setCategoryimg(uploadimg)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '58%',
              left: '80%',
              transform: 'translate(-50%, -50%)',
              width: "300px",
              height: "450px",
              bgcolor: 'background.paper',
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Category
              </Typography>
              <ToggleButtonGroup
                value={addCategoryGender}
                exclusive
                onChange={(event, val) => {
                  if (val) {
                    setAddCategoryGender(val)
                  }
                }}
              >
                <ToggleButton style={{ height: "40px", }} value="male" aria-label="male">
                  <PersonRoundedIcon /> Male
                </ToggleButton>
                <ToggleButton style={{ height: "40px", }} value="female" aria-label="female">
                  <Person3Icon /> Female
                </ToggleButton>
              </ToggleButtonGroup>
              <TextField id="standard-basic" label="Category" variant="standard" value={addCategoryName} sx={{ width: "300px" }}
                onChange={(e) => {
                  setAddCategoryName(e.target.value.trim())
                }} />
              <label>
                <img src={categoryimg} className={Appcss.upload}></img>
                <input type="file" style={{ display: "none" }} onChange={(e) => {
                  Array.from(e.target.files).map((val) => {
                    return setCategoryimg(URL.createObjectURL(val))
                  })
                }}></input>
              </label>
              <Button variant="outlined" onClick={() => {
                if (categoryimg !== uploadimg && addCategoryName !== "") {
                  setAddCategoryName("")
                  setCategoryimg(uploadimg)
                  setOpen(false)
                  dispatch(addCategory({ addCategoryName, addCategoryGender, categoryimg }))
                  dispatch(getCategories(gender))
                }
              }}>Add</Button>
            </Box>
          </Modal>
        </div>
      </div>
      <div className={Appcss.subcategorysection}>
        <BottomNavigation
          sx={{
            width: "auto",
            maxWidth: "90%",
            height: "70px",
            display: 'flex',
            alignItems: "center",
            justifyContent: "start",
            background: "#E5E5E5",
            overflow: "auto"
          }}
          showLabels
          value={subcategoryValue}
          onChange={(event, newValue) => {
            setSubcategoryValue(newValue)
            dispatch(getProducts(newValue))
            setAddProductDisplay("flex")
          }}
        >
          {
            subcategories?.map((obj) => {
              return (
                <BottomNavigationAction
                  value={obj.id}
                  key={obj.id}
                  label={obj.name}
                  sx={{
                    minWidth: "150px",
                    margin: "5px",
                    background: "#FFFFFF",
                    borderRadius: 2,
                    height: "40px"
                  }} />
              )
            })
          }
        </BottomNavigation>
        <div className={Appcss.addsubcategory}>
          <Button onClick={() => setOpenSub(true)} sx={{ width: "50px", height: "50px", fontSize: "25px" }}>+</Button>
          <Modal
            open={openSub}
            onClose={() => {
              setOpenSub(false)
              setAddCategoryName("")
              setCategoryimg(uploadimg)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '80%',
              transform: 'translate(-50%, -50%)',
              width: "300px",
              height: "150px",
              bgcolor: 'background.paper',
              borderRadius: "5px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Subcategory in {categoryName}
              </Typography>
              <TextField id="standard-basic" label="Subcategory" variant="standard" value={addCategoryName} sx={{ width: "300px" }}
                onChange={(e) => {
                  setAddCategoryName(e.target.value.trim())
                }} />
              <Button variant="outlined" onClick={() => {
                if (addCategoryName !== "") {
                  dispatch(addSubcategory({ addCategoryName, categoryValue }))
                  dispatch(getSubcategories(categoryValue))
                  setAddCategoryName("");
                  setOpenSub(false)
                }
              }}>Add</Button>
            </Box>
          </Modal>
        </div>
      </div>
      <div className={Appcss.productsection}>
        {
          products?.map((obj) => {
            return (
              <div className={Appcss.product} key={obj.id}>
                <div onClick={() => {
                  setZoomModal(true)
                  setZoom(obj.img)
                }} className={Appcss.productimgbox} style={{ backgroundImage: `url(${obj.img})` }}> </div>
                <div className={Appcss.productname}>
                  <p style={{ fontSize: "14px" }}>{obj.name}</p>
                  <p>{obj.price}$</p>
                </div>

              </div>
            )
          })
        }
        <Modal
          open={zoomModal}
          onClose={() => {
            setZoomModal(false)
            setAddCategoryName("")
            setCategoryimg(uploadimg)
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "522px",
            height: "342px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "6px",
            boxShadow: 24,
            p: 4,
            backgroundImage: `url(${zoom})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}>
          </Box>
        </Modal>
        <div className={Appcss.product} style={{ justifyContent: "center", cursor: "pointer", display: addProductDisplay }}
          onClick={() => {
            setAddProductModal(true)
          }}>
          <AddIcon sx={{ color: "dimgrey", fontSize: "30px" }} />
          <h3 style={{ color: "dimgrey", fontSize: "25px", fontFamily: "sans-serif" }}>Add Product</h3>
        </div>
        <Modal
          open={addProductModal}
          onClose={() => {
            setAddProductModal(false)
            setAddProductName("")
            setAddProductPrice()
            setProductImg(uploadimg)
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            bottom: "-2%",
            right: '-15%',
            transform: 'translate(-50%, -50%)',
            width: "650px",
            height: "300px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            bgcolor: 'background.paper',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}>
            <Typography sx={{ fontSize: "25px", position: "absolute", top: "3%" }}>Add Product</Typography>
            <label>
              <img src={productImg} className={Appcss.upload}></img>
              <input type="file" style={{ display: "none" }} onChange={(e) => {
                Array.from(e.target.files).map((val) => {
                  return setProductImg(URL.createObjectURL(val))
                })
              }}></input>
            </label>
            <Box sx={{
              width: "50%",
              height: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}>
              <TextField id="standard-basic" label="Product name" variant="standard" value={addProductName} sx={{ width: "300px" }}
                onChange={(e) => {
                  setAddProductName(e.target.value.trim())
                }} />
              <TextField id="standard-basic" type="number" label="Price" variant="standard" value={addProductPrice} sx={{ width: "300px" }}
                onChange={(e) => {
                  setAddProductPrice(e.target.value.trim())
                }} />
            </Box>
            <Button sx={{ position: "absolute", bottom: "8%", right: "23%" }}
              variant="contained"
              onClick={() => {
                if (addProductName && addProductPrice && productImg !== uploadimg) {
                  console.log(addProductName, addProductPrice, productImg, "okkk");
                  dispatch(addProduct({ subcategoryValue, addProductName, addProductPrice, productImg }))
                  dispatch(getProducts(subcategoryValue))
                  setAddProductPrice()
                  setAddProductName("")
                  setProductImg(uploadimg)
                  setAddProductModal(false)
                }
              }}
            >Add</Button>
          </Box>
        </Modal>
      </div>
    </div >
  )
}

export default App