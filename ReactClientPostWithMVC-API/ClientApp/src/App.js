import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
//import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { AuthorList } from './components/Authors/AuthorList';
import { CreateAuthor } from './components/Authors/CreateAuthor';
import { EditAuthor } from './components/Authors/EditAuthor';
import { DetailAuthor } from './components/Authors/DetailAuthor';
import { DeleteAuthor } from './components/Authors/DeleteAuthor';
import { PostList } from './components/Posts/PostList';
import { CreatePost } from './components/Posts/CreatePost';
import { EditPost } from './components/Posts/EditPost';
import { DetailPost } from './components/Posts/DetailPost';
import { DeletePost } from './components/Posts/DeletePost';
import { UserPost } from './components/Posts/UserPost';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>           
        <Route exact path='/' component={PostList} />
        <Route path='/createPost' component={CreatePost} />
        <Route path='/editPost/:id' component={EditPost} />
        <Route path='/detailPost/:id' component={DetailPost} />
        <Route path='/deletePost/:id' component={DeletePost} />
        <Route path='/userPost/:id' component={UserPost} />

        <Route path='/authorList' component={AuthorList} />
        <Route path='/createAuthor' component={CreateAuthor} />     
        <Route path='/editAuthor/:id' component={EditAuthor} />
        <Route path='/detailAuthor/:id' component={DetailAuthor} />
        <Route path='/deleteAuthor/:id' component={DeleteAuthor} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
