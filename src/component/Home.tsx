import React, { HtmlHTMLAttributes, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Switch } from "@headlessui/react";
import { IMovie } from "interfaces/movie.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { addMovie } from "redux/movie.reducer";
import moment from "moment";

type Props = {};

const Home = (props: Props) => {
    let [isOpen, setIsOpen] = useState(false);
    const [dangChieu, setDangChieu] = useState(false);
    const [sapChieu, setSapChieu] = useState(false);
    const [hot, setHot] = useState(false);

    //dispatch
    const dispatch = useDispatch<AppDispatch>();
    //selector
    const movie = useSelector((state: RootState) => state.movie_reducer);

    //state
    const [movieState, setMovieState] = useState<IMovie>({});

    const addNewMovie = () => {
        const ngaychieu = moment(movieState.ngayKhoiChieu).format("DD/MM/YYYY");
        setMovieState({ ...movieState, hot: hot, sapChieu, dangChieu: dangChieu, ngayKhoiChieu: ngaychieu });

        dispatch(addMovie(movieState));
    };

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name;
        setMovieState({ ...movieState, [name]: target.value });
    };

    const onUploadFile = async (e: any) => {
        const file = e.target.files[0];
        setMovieState({
            ...movieState,
            hinhAnh: file,
        });
    };

    return (
        <>
            <Dialog
                style={{
                    position: "absolute",
                    height: "100vh",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    top: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Dialog.Panel className="bg-gray-200 rounded-md p-4">
                    <Dialog.Title>
                        <h4 className="modal-title ">Add Movie</h4>
                    </Dialog.Title>
                    <Dialog.Description>
                        <div className="form-group">
                            <label>Tên Phim</label>
                            <input
                                id="TenPhim"
                                className="form-control"
                                placeholder="Nhập vào tên phim"
                                onChange={onChangeText}
                                name="tenPhim"
                            />
                        </div>
                        <div className="form-group">
                            <label>Trailer</label>
                            <input
                                id="Trailer"
                                className="form-control"
                                placeholder="Nhập vào giá"
                                name="trailer"
                                onChange={onChangeText}
                            />
                        </div>

                        <div className="form-group">
                            <label>Mô tả: </label>
                            <textarea
                                className="form-control"
                                id="MoTa"
                                cols={10}
                                rows={10}
                                defaultValue={""}
                                name="moTa"
                                onChange={onChangeText}
                            />
                        </div>
                        <div className="form-group">
                            <label>Chọn Ngày</label>
                            <input
                                id="Trailer"
                                type="date"
                                className="form-control"
                                placeholder="Nhập vào giá"
                                name="ngayKhoiChieu"
                                onChange={onChangeText}
                            />
                        </div>
                        <div className="py-3">
                            <Switch.Group>
                                <div className="flex items-center">
                                    <Switch.Label className="mr-4">Đang Chiếu</Switch.Label>
                                    <Switch
                                        checked={dangChieu}
                                        onChange={setDangChieu}
                                        className={`bg-slate-300 ${
                                            dangChieu ? "bg-red-300" : "bg-blue-200"
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                    >
                                        <span
                                            className={`${
                                                dangChieu ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                </div>
                            </Switch.Group>
                        </div>
                        <div className="py-3">
                            <Switch.Group>
                                <div className="flex items-center">
                                    <Switch.Label className="mr-4">Sắp Chiếu</Switch.Label>
                                    <Switch
                                        checked={sapChieu}
                                        onChange={setSapChieu}
                                        className={`bg-slate-300 ${
                                            sapChieu ? "bg-red-300" : "bg-blue-200"
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                    >
                                        <span
                                            className={`${
                                                sapChieu ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                </div>
                            </Switch.Group>
                        </div>
                        <div>
                            <Switch.Group>
                                <div className="flex items-center">
                                    <Switch.Label className="mr-4">Hot</Switch.Label>
                                    <Switch
                                        checked={hot}
                                        onChange={setHot}
                                        className={`bg-slate-300 ${
                                            hot ? "bg-red-300" : "bg-blue-200"
                                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                    >
                                        <span
                                            className={`${
                                                hot ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </Switch>
                                </div>
                            </Switch.Group>
                        </div>
                        <div className="py-3">
                            <label>Chọn Hình</label>
                            <input
                                id="hinhanh"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                name="hinhAnh"
                                onChange={onUploadFile}
                            />
                        </div>
                    </Dialog.Description>

                    <button onClick={addNewMovie} className="bg-green-500 rounded-lg mr-3 p-1">
                        Add New Movie
                    </button>
                    <button onClick={() => setIsOpen(false)} className="bg-red-500 rounded-lg p-1">
                        Cancel
                    </button>
                </Dialog.Panel>
            </Dialog>
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapsibleNavId"
                        aria-controls="collapsibleNavId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    />
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    Home <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="dropdownId"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownId">
                                    <a className="dropdown-item" href="#">
                                        Action 1
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Action 2
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <header className="display-4 my-4">Dashboard - Quản lý Movie</header>
                {/* Phan tab menu */}
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" href="#DanhSachSP" role="tab" data-toggle="tab">
                            Danh sách Movie
                        </a>
                    </li>
                </ul>
                <br />
                {/* Tab panes */}
                <div className="tab-content">
                    {/*Danh sách sản phẩm */}
                    <div role="tabpanel" className="tab-pane in active" id="DanhSachSP">
                        <div className="row">
                            <div className="col-md-8">
                                {/* BEGIN BUTTOM THÊM MỚI */}
                                <button
                                    id="btnThemSP"
                                    className="btn btn-success"
                                    data-toggle="modal"
                                    data-target="#myModal"
                                    onClick={() => setIsOpen(true)}
                                >
                                    <i className="fa fa-plus mr-1" />
                                    Thêm Mới
                                </button>
                                {/* END BUTTON THÊM MỚI */}
                            </div>
                            <div className="col-md-4">
                                {/* BEGIN TÌM KIẾM */}
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập từ khóa"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">
                                            <i className="fa fa-search" />
                                        </span>
                                    </div>
                                </div>
                                {/* END TÌM KIẾM */}
                            </div>
                        </div>
                        <div className="clear-fix" />
                        <div className="tblSanPham" id="tblSanPham">
                            {/* BEGIN TABLE SẢN PHẨM */}
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Phim</th>
                                        <th>Giá</th>
                                        <th>Hình Ảnh</th>
                                        <th>Mô Tả</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tblDanhSachSP" />
                            </table>
                            {/* END TABLE SẢN PHẨM */}
                        </div>

                        <br />
                    </div>
                </div>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Modal Heading</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Tên Sản Phẩm</label>
                                    <input id="TenSP" className="form-control" placeholder="Nhập vào tên sản phẩm" />
                                </div>
                                <div className="form-group">
                                    <label>Giá</label>
                                    <input id="GiaSP" className="form-control" placeholder="Nhập vào giá" />
                                </div>
                                <div className="form-group">
                                    <label>Hình Ảnh</label>
                                    <input id="HinhSP" className="form-control" placeholder="Nhập vào hình sản phẩm" />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả: </label>
                                    <textarea
                                        className="form-control"
                                        id="MoTa"
                                        cols={30}
                                        rows={10}
                                        defaultValue={""}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
