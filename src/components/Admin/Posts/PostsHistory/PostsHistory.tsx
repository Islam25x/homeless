import {
    useGetPropertiesHistoryQuery,
    useDeletePropertiesHistoryMutation,
} from "../../../RTK/HistoryApi/HistoryApi";
import {
    Spinner,
    Alert,
    Container,
    Table,
    Button,
} from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

function PostsHistory() {
    const {
        data: postsHistory,
        isLoading,
        isError,
        refetch,
    } = useGetPropertiesHistoryQuery();
    const [deleteHistory, { isLoading: isDeleting }] =
        useDeletePropertiesHistoryMutation();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await deleteHistory().unwrap();
            refetch();
            toast.success("History deleted");
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
                An error occurred while fetching the posts history.
            </Alert>
        );
    }

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div>
                {postsHistory?.length !== 0 && (
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={isDeleting || deleting}
                    >
                        {isDeleting || deleting ? "Deleting..." : "Delete History"}
                    </Button>
                )}
            </div>

            {postsHistory?.length === 0 ? (
                <p className="text-center text-muted">No posts history available.</p>
            ) : (
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
                        {postsHistory?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.historyType}</td>
                                <td
                                    className={
                                        item.actionType === "Accept"
                                            ? "text-success"
                                            : "text-danger"
                                    }
                                >
                                    {item.description}
                                </td>
                                <td>{new Date(item.actionDate).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default PostsHistory;
