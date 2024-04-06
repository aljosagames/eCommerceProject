import  axios  from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () =>{
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [categoryInput, setCategory] = useState([]);
  const category_id  = useParams().id;

  useEffect(()=>{
    axios.get(`api/edit-category/${category_id}`).then(res=>{
      if(res.data.status === 200){
        setCategory(res.data.category);
      }
      else if (res.data.status === 404){
        swal("Error", res.data.message, "error");
        navigate('/admin/view-category');
      }
    })
    setLoading(false)
  },[category_id,navigate])

  const handleInput = e =>{
    e.persist();

    setCategory({...categoryInput, [e.target.name]: e.target.value})
  }

  if(loading){
    return <h4>Loading Edit Category...</h4>
  }

  const updateCategory = e =>{
    e.preventDefault();
    const data = categoryInput;
    axios.put(`api/update-category/${category_id}`,data).then(res=>{
      if(res.data.status === 200){
        swal("Success", res.data.message, "success");
        navigate('/admin/view-category');
      }
      else if(res.data.status === 422){
        swal("Error", "Invalid Credentials", "error")
      }
      else if(res.data.status === 404){
        swal("Error", res.data.message, "error")
        navigate('/admin/view-category');
      }
    })
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Edit Category <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">BACK</Link></h1>

      <form onSubmit={updateCategory}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags-tab-pane" type="button" role="tab" aria-controls="seo-tags-tab-pane" aria-selected="false">
              SEO Tags
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane card-body bordered fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
            <div className="form-group mb-3">
              <label>Slug</label>
              <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} /> Status 0=shown/1=hidden
            </div>
          </div>
          <div className="tab-pane card-body bordered fade" id="seo-tags-tab-pane" role="tabpanel" aria-labelledby="seo-tags-tab" tabIndex="0">
            <div className="form-group mb-3">
              <label>Meta Title</label>
              <textarea type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control"></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <textarea type="text" name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 float-end">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditCategory;