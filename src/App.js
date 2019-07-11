import React from 'react';
import { Container, Header, Button,
   Icon, Image, Menu,
   Segment, Sidebar } from 'semantic-ui-react'

let lastScrollY = 0;
let ticking = false;

class App extends React.Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  // constructo(props) {
  //   super(props);
  //   this.handleScroll = this.handleScroll.bind(this);
  // }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollW);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  nav = React.createRef();

  handleScroll = () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        this.nav.current.style.top = `${lastScrollY}px`;
        console.log(`${lastScrollY}px`);
        ticking = false;
      });

      ticking = true;
    }
  };

  render() {
    const { visible } = this.state

    return (
      <Container text>
        <Header as='h2'>Header</Header>

        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment} style={{ height: 1900 }}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='https://react.semantic-ui.com//images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

export default App;
