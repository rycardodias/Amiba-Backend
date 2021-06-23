import React from 'react';
import PropTypes from 'prop-types';
import { getUserByToken } from '../lib/requests';
import { verifyPermission, urlPermissions } from '../lib/permissions'

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      // permissionGranted: false
    };
  }

  checkURLPermission = (url, permission) => {
    const urlPerms = urlPermissions.filter(u => u.url === url)[0]
    if (urlPerms) {
      const permissionGranted = verifyPermission(permission, urlPerms.permission)
      return permissionGranted
    }
    return false

  }

  fetch = async () => {
    const user = await getUserByToken();
    //NAO ESTÀ LOGADO user.items.error
    if (user.items.data && this.props.url) {
      const result = this.checkURLPermission(this.props.url, user.items.data.permission)
      if (!result) {
        this.setState({ ...user, error: {message: "Não tem permissões!"}})
        return
      }
  }
  this.setState({ ...user });
  };

  async componentDidMount() {
    const user = await getUserByToken();    

    if (user.items.data && this.props.url) {
        const result = this.checkURLPermission(this.props.url, user.items.data.permission)
        if (!result) {
          this.setState({ ...user, error: {message: "Não tem permissões!"}})
          return
        }
    }
    this.setState({ ...user });
  }

  render() {
    const { error, isLoaded, items, permissionGranted } = this.state;
    if (error) {
      return <div>Erro: {error.message}</div>;
    }

    return this.props.children(items, isLoaded, this.fetch, permissionGranted);
  }
}

Me.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Me;