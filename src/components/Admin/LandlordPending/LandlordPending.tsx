import { useGetLandlordPendingQuery } from "../../RTK/Auth/AuthApi";
import { useAcceptLandlordMutation, useDeleteLandlordMutation } from "../../RTK/Admin/AdminApi";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import RegistrationsHistory from "./RegistrationsHistory/RegistrationsHistory";
import "./LandlordPending.css";

function LandlordPending() {
    const [showHistory, setShowHistory] = useState(false);
    const { data, isLoading, isError, refetch } = useGetLandlordPendingQuery();
    const [acceptLandlord, { isLoading: isAcceptLoading, isError: isAcceptError }] = useAcceptLandlordMutation();
    const [deleteLandlord, { isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteLandlordMutation();

    const toggleHistory = () => setShowHistory(!showHistory);

    if (isLoading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center my-5">
                <Alert variant="danger">Failed to load landlords.</Alert>
            </div>
        );
    }

    if (!showHistory && data?.length === 0) {
        return (
            <section id="LandlordPending" className="my-5">
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0">Pending Landlords</h2>
                        <button onClick={toggleHistory} className="History-btn">
                            {showHistory ? "Pending" : "History"}
                        </button>
                    </div>
                    <Alert variant="info" className="text-center">
                        No pending landlords found.
                    </Alert>
                </Container>
            </section>
        );
    }

    return (
        <section id="LandlordPending" className="my-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">{showHistory ? "Registration History" : "Pending Landlords"}</h2>
                    <button onClick={toggleHistory} className="History-btn">
                        {showHistory ? "Back to Pending" : "History"}
                    </button>
                </div>

                {showHistory ? (
                    <RegistrationsHistory />
                ) : (
                    <>
                        {isAcceptError && <Alert variant="danger">Failed to accept landlord.</Alert>}
                        {isDeleteError && <Alert variant="danger">Failed to reject landlord.</Alert>}

                        {data?.map((landlord: any) => (
                            <div
                                key={landlord.id}
                                className="landlord-card d-flex justify-content-between align-items-center p-3 mb-3 rounded"
                            >
                                <div className="left d-flex align-items-center">
                                    {landlord.image ? (
                                        <img className="me-4" src={landlord.image} alt={landlord.name} />
                                    ) : (
                                        <div className="profile-photo me-4">
                                            <i className="def-user fa-regular fa-user"></i>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h6>{landlord.name}</h6>
                                        <p className="mb-0">
                                            <strong>Email:</strong> {landlord.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="right d-flex align-items-center gap-2">
                                    <Button
                                        variant="success"
                                        className="action-btn"
                                        disabled={isAcceptLoading}
                                        onClick={() =>
                                            acceptLandlord({ requestId: landlord.id }).then(() => refetch())
                                        }
                                    >
                                        <i className="fa-solid fa-check"></i>
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className="action-btn"
                                        disabled={isDeleteLoading}
                                        onClick={() =>
                                            deleteLandlord({ requestId: landlord.id }).then(() => refetch())
                                        }
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </Container>
        </section>
    );
}

export default LandlordPending;
