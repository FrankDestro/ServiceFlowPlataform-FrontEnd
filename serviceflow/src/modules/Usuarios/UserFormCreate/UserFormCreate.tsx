import {
    faCancel,
    faCheckCircle,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import * as departmentService from "../../Service/department-service";
import * as rolesService from "../../Service/role-service";
import * as solvingAreaService from "../../Service/solving-area";
import * as userService from "../../Service/user-service";
import {DepartmentDTO} from "../../models/DepartmentDTO";
import {RoleDTO} from "../../models/RoleDTO";
import {SolvingAreaDTO} from "../../models/solvingAreaDTO";
import {toUserDTO} from "../../utils/functions";
import Button from "../../Components/Button/Button";
import "./UserFormCreate.css";
import DialogInfo from "../../Components/DialogInfo/DialogInfo";

function UserFormCreate() {
    const [solvingAreas, setSolvingAreas] = useState<SolvingAreaDTO[]>([]);
    const [departments, setDepartments] = useState<DepartmentDTO[]>([]);
    const [roles, setRoles] = useState<RoleDTO[]>([]);

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Usuário Cadastrado com Sucesso!",
    });

    function handleDialogInfoClose() {
        setDialogInfoData({...dialogInfoData, visible: false});
        window.location.reload();
    }

    useEffect(() => {
        departmentService.getAllDepartment().then((response) => {
            setDepartments(response.data);
        });
    }, []);

    useEffect(() => {
        solvingAreaService.getAllSolvingArea().then((response) => {
            setSolvingAreas(response.data);
        });
    }, []);

    useEffect(() => {
        rolesService.getAllRoles().then((response) => {
            setRoles(response.data);
        });
    }, []);

    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        department: "",
        solvingArea: "",
        imgProfile: "",
        roles: [] as string[],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setFormData((prevData) => ({
                ...prevData,
                imgProfile: URL.createObjectURL(file),
            }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setFormData((prevData) => ({
            ...prevData,
            roles: selectedValues,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const requestBody = toUserDTO(formData);

        userService
            .createUser(requestBody)
            .then(() => {
                setDialogInfoData({
                    visible: true,
                    message: "Usuário cadastrado com sucesso!",
                });
            })
            .catch((e) => {
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container-user-form-create">
                <div className="form-container">
                    <div className="profile-photo-container">
                        <div className="profile-image-circle">
                            {image ? (
                                <img
                                    src={formData.imgProfile}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            ) : (
                                <span className="profile-image-placeholder">Add Image</span>
                            )}
                        </div>
                        <label htmlFor="imgProfile" className="custom-upload-button">
                            Adicionar Foto
                        </label>


                        <input
                            type="file"
                            id="imgProfile"
                            onChange={handleImageChange}
                            className="profile-image-input"
                        />
                    </div>
                    <div className="form-fields">
                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="firstName">Nome</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="floating-input"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    name="firstName"
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="lastName">Sobrenome</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="floating-input"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    name="lastName"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-item">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    className="floating-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    name="email"
                                />
                            </div>

                            <div className="form-item">
                                <label htmlFor="contactNumber">Número de contato</label>
                                <input
                                    type="text"
                                    id="contactNumber"
                                    placeholder="dd + numero"
                                    className="floating-input"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    name="contactNumber"
                                />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="department">Departamento</label>
                            <select
                                value={formData.department}
                                onChange={handleChange}
                                name="department"
                            >
                                <option value="">Selecione</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-item">
                            <label htmlFor="solvingArea">Área Solucionadora</label>
                            <select
                                value={formData.solvingArea}
                                onChange={handleChange}
                                name="solvingArea"
                            >
                                <option value="">Selecione</option>
                                {solvingAreas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-item">
                            <label>Permissões</label>
                            <select
                                multiple
                                value={formData.roles}
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled>
                                    Selecione
                                </option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.authority}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container-button-userFormCreate">
                    <Button
                        text="Salvar"
                        icon={faSave}
                        background="#11344d"
                        hoverColor="#335577"
                        type="submit"
                        borderRadius="5px"
                    />
                    <Button
                        text="Cancelar"
                        icon={faCancel}
                        background="#11344d"
                        hoverColor="#335577"
                        borderRadius="5px"
                    />
                </div>
                {dialogInfoData.visible && (
                    <DialogInfo
                        IconColor="#3a7e24"
                        ButtonColor="#3a7e24"
                        ButtonHoverColor="#70a94a"
                        Icon={faCheckCircle}
                        message={dialogInfoData.message}
                        onDialogClose={handleDialogInfoClose}
                    />
                )}
            </div>
        </form>
    );
}

export default UserFormCreate;
