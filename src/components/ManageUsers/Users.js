import { useEffect, useState } from "react";
import './Users.scss';
import { deleteUser, fetchAllUsers } from "../../services/userServies";
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUuser] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);
        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchAllUsers();
    };
    const handldDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowModalDelete(true);
    }
    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({})
    }
    const confinDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        console.log(">> chek respone: ", response);
        if (response && response.data.EC === 0) {
            console.log(dataModal);
            toast.success(response.data.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            console.log(dataModal);
            toast.error(response.data.EM);
        }
    }

    const onHideModalUser = async() => {
        setIsShowModalUuser(false);
        //await fetchUsers();
    }
    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-success">Refesh</button>
                        <button className="btn btn-primary" onClick={() => setIsShowModalUuser(true)}>Add new user</button>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {listUsers && listUsers.length > 0 ?
                                    <>

                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row -${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ' '}</td>
                                                    <td>
                                                        <button className="btn btn-warning mx-3">Edit</button>
                                                        <button className="btn btn-danger"
                                                            onClick={() => handldDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </> :
                                    <>

                                        <tr><td>not found useres</td></tr>
                                    </>}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />

                        </div>
                    }
                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confinDeleteUser={confinDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                title={"Create new Users"}
                onHide={onHideModalUser}
                show={isShowModalUser}

            />
        </>
    )




}

export default Users;