import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Upload from './Upload';
import { setSearch } from '../redux/searchSlice';
import { Avatar } from '@mui/material';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 20;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={(e) => dispatch(setSearch(e.target.value))} />
            <Link style={{ color: 'white' }} to="/search">
              <SearchOutlinedIcon />
            </Link>
          </Search>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <User>
                <VideoCallIcon onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} />
                <Avatar
                  alt={currentUser.name}
                  src={currentUser.img ? currentUser.img : '/broken-image.jpg'}
                  sx={{ width: 32, height: 32 }}
                />
                {currentUser.name}
              </User>
            </div>
          ) : (
            <Link to="signin" style={{ textDecoration: 'none' }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
