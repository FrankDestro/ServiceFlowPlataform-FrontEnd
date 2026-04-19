import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as functions from "../../../utils/helpers/functions.ts";
import "./TableKnowError.css";
import {format} from "date-fns";
import {parseISO} from "date-fns";
import SearchFilterKnowError from "../components/SearchFilterKnowError/SearchFilterKnowError.tsx";
import type {KnowErrorSearchParams, KnowErrorSimpleDTO} from "../models/knowErrorDTO.ts";

type TableKnowErrorProps = {
    knowerros: KnowErrorSimpleDTO[];
    onSearch: (formData: KnowErrorSearchParams) => void;
    onReload: () => void;
};

const TableKnowError = ({onSearch, knowerros}: TableKnowErrorProps) => {
    return (
        <>
            <div className="container-base">
                <SearchFilterKnowError onSearch={onSearch}/>
            </div>
            <table className="container-base">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Root Cause</th>
                    <th>Solution</th>
                    <th>Tags</th>
                    <th>Status</th>
                    <th>Create Date</th>
                    <th>Resolution Date</th>
                    <th>userID</th>
                    <th>userEmail</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {knowerros.map((knowerrosItem) => (
                    <tr key={knowerrosItem.id}>
                        <td>{knowerrosItem.id}</td>
                        <td className="limited-text">{knowerrosItem.title}</td>
                        <td className="limited-text">{knowerrosItem.rootCause}</td>
                        <td className="limited-text">{knowerrosItem.solution}</td>

                        <td className="limited-text">
                            {knowerrosItem.tags.map((tag, index) => (
                                <span key={index} className="tag-td">
                    {tag}
                  </span>
                            ))}
                        </td>
                        <td>
                <span
                    style={functions.getStatusKnowErrorsBadgeStyle(
                        knowerrosItem.status
                    )}
                >
                  {knowerrosItem.status}
                </span>
                        </td>
                        <td>
                            {format(parseISO(knowerrosItem.createDate), "dd/MM/yyyy")}
                        </td>
                        <td>
                            {knowerrosItem.resolutionDate
                                ? format(parseISO(knowerrosItem.resolutionDate), "dd/MM/yyyy")
                                : "N/A"}
                        </td>
                        <td>TESTE</td>
                        <td>TESTE</td>
                        <td>
                            <div className="container-button-details">
                                <FontAwesomeIcon icon={faEdit}/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default TableKnowError;
