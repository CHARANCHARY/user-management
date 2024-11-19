import React, { useContext, useEffect, useState,useCallback } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner"
import { useNavigate } from "react-router-dom"
import "./home.css"
import axios from 'axios';
import { BASE_URL } from '../../service/helper';
import { globalState } from '../../context/GlobalContext';

const Home = () => {

  const { setData } = useContext(globalState)

  const [showspin, setShowSpin] = useState(true)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [gender, setGender] = useState("All")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1)
  const [totalpage, setTotalPage] = useState(0)
  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register")
  }
  const fetchingData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}?search=${search}&gender=${gender}&page=${page}&sort=${sort}&status=${status}`);
      setData(data.doc);
      setTotalPage(data.pagination.pageCount);
    } catch (e) {
      console.log('Data-Fetching Error', e);
    }
  }, [search, gender, status, page, sort,setData]);  // Dependencies of the function

  useEffect(() => {
    const timerOut = setTimeout(() => {
      fetchingData();
    }, 800);

    return () => clearTimeout(timerOut);
  }, [fetchingData]);  // Only runs when fetchingData changes

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
      <div className="container  gradient" >
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 ">
            <div className="search col-lg-12">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 animated-search-input"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="primary" className="button" >Search</Button>
              </Form>
            </div>
            <div className="add_btn mt-4 ">

              <button  onClick={adduser}  className ="animated-button1 mt-4" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                &nbsp; Add User
              </button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-3 mb-5 mt-5 d-flex  justify-content-between flex-wrap">
            {/* <div className="export_csv">
              <Button className='export_btn'>Export To Csv</Button>
            </div> */}
            <div className="filter_gender">
              <div className="filter">
                
                <div className="gender d-flex justify-content-between gap-2">
                  <h7 className="ml-5" >Filter By Gender :-</h7>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"male"}
                    onChange={(e) => setGender(e.target.value)}

                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"female"}
                    onChange={(e) => setGender(e.target.value)}
                  />


                  
                </div>
              </div>
            </div>

            {/* sort by value */}
            {/* <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")} >New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
               
                <div className="status_radio d-flex justify-content-between flex-wrap gap-2">
                <h7>Filter By Status :- </h7>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables setPage={setPage} page={page} totalpage={totalpage} />
        }

      </div>
    </>
  )
}

export default Home