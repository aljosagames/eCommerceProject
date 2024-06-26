import React, { useState } from "react";
import axios from 'axios';
import swal from  "sweetalert";

const Category = () =>{
  const [categoryInput, setCategory] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    error_list: []
  });

  const reset = {
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    error_list: []
  }

  const handleInput = e =>{
    e.persist();

    setCategory({...categoryInput, [e.target.name]: e.target.value})
  }

  const submitCategory = e =>{
    e.preventDefault();

    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_description: categoryInput.meta_description,
      meta_keyword: categoryInput.meta_keyword,
    };

    axios.post('api/store-category',data).then(res=>{
      if(res.data.status === 200){
        setCategory(reset);
        swal("Success", res.data.message, "success");
      }
      else if(res.data.status === 400){
        setCategory({...categoryInput, error_list:res.data.errors});
      }
    })
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Add Category</h1>

      <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
              <span>{categoryInput.error_list.slug}</span>
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
              <span>{categoryInput.error_list.name}</span>
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
              <span>{categoryInput.error_list.meta_title}</span>
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default Category;