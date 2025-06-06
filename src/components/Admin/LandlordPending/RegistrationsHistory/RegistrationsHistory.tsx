import {
    useGetRegistrationsHistoryQuery,
    useDeleteRegistrationsHistoryMutation,
} from "../../../RTK/HistoryApi/HistoryApi";
import { Spinner, Alert, Container, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./RegistrationsHistory.css";
import { useState } from "react";

function RegistrationsHistory() {
    const { data, isLoading, isError, refetch } = useGetRegistrationsHistoryQuery();
    const [deleteHistory, { isLoading: isDeleting }] = useDeleteRegistrationsHistoryMutation();
    const [deleting, setDeleting] = useState(false);

    const handleDeleteHistory = async () => {
        try {
            setDeleting(true);
            await deleteHistory().unwrap();
            toast.success("History deleted");
            refetch();
        } catch (err) {
            toast.error("Failed to delete history");
        } finally {
            setDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="danger" className="text-center my-4">
                An error occurred while fetching the history.
            </Alert>
        );
    }

    return (
        <Container className="my-5">
            {data?.length === 0 ? (
                <p className="text-center text-muted">No registration history available.</p>
            ) : (
                <>
                    <div className="d-flex justify-content-end mb-3">
                        <Button
                            variant="danger"
                            onClick={handleDeleteHistory}
                            disabled={deleting || isDeleting}
                        >
                            {deleting || isDeleting ? "Deleting..." : "Delete History"}
                        </Button>
                    </div>
                    <Table bordered hover responsive className="history-table">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.historyType}</td>
                                    <td
                                        className={
                                            item.actionType === "Accept" ? "text-success" : "text-danger"
                                        }
                                    >
                                        {item.description}
                                    </td>
                                    <td>{new Date(item.actionDate).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

export default RegistrationsHistory;
