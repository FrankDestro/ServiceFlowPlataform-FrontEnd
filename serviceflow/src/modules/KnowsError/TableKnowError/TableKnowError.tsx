import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO } from "date-fns";
import { PencilLine } from "lucide-react";
import * as functions from "../../../utils/helpers/functions.ts";
import SearchFilterKnowError from "../components/SearchFilterKnowError/SearchFilterKnowError.tsx";
import type { KnowErrorSearchParams, KnowErrorSimpleDTO } from "../models/knowErrorDTO.ts";
import "./TableKnowError.css";

type TableKnowErrorProps = {
    knowerros: KnowErrorSimpleDTO[];
    onSearch: (formData: KnowErrorSearchParams) => void;
    onReload: () => void;
};

const TableKnowError = ({ onSearch, knowerros }: TableKnowErrorProps) => {
    return (
        <>
            <div className="container-base">
                <SearchFilterKnowError onSearch={onSearch} />
            </div>
            <table className="container-base">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Tags</th>
                        <th>Sistemas Afetados</th>
                        <th>Status</th>
                        <th>Criado por</th>
                        <th>Criado em</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {knowerros.map((ke) => (
                        <tr key={ke.id}>

                            {/* ID */}
                            <td>{ke.id}</td>

                            {/* Título */}
                            <td className="limited-text">{ke.title}</td>

                            {/* Tags */}
                            <td>
                                <div className="tag-list">
                                    {ke.tags?.slice(0, 2).map((tag, index) => (
                                        <span key={index} className="tag-td">{tag}</span>
                                    ))}
                                    {ke.tags?.length > 2 && (
                                        <span className="tag-td">+{ke.tags.length - 2}</span>
                                    )}
                                </div>
                            </td>

                            {/* Sistemas Afetados */}
                            <td className="limited-text">
                                {ke.affectedSystems ?? "—"}
                            </td>

                            {/* Status */}
                            <td>
                                <span style={functions.getStatusKnowErrorsBadgeStyle(ke.status)}>
                                    {ke.status}
                                </span>
                            </td>

                            {/* Criado por */}
                            <td>{ke.registratorUserEmail ?? "—"}</td>

                            {/* Criado em */}
                           <td>{format(parseISO(ke.createDate), "dd/MM/yyyy HH:mm")}</td>

                            {/* Opções */}
                            <td>
                                <div className="btn-action">
                                    <PencilLine size={16} />
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