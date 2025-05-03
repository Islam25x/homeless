import { useGetLandlordPendingQuery } from "../../RTK/Auth/AuthApi";
import { useAcceptLandlordMutation, useDeleteLandlordMutation } from "../../RTK/Admin/AdminApi";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import "./LandlordPending.css";

function LandlordPending() {
    const { data, isLoading, isError, refetch } = useGetLandlordPendingQuery();
    const [AcceptLandlord, { isLoading: isAcceptLoading, isError: isAcceptError }] = useAcceptLandlordMutation();
    const [DeleteLandlord, { isLoading: isDeleteLandlordLoading, isError: isDeleteLandlordError }] = useDeleteLandlordMutation();

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
                <Alert variant="danger">Something went wrong while loading landlords!</Alert>
            </div>
        );
    }

    // تحقق من إذا كانت القائمة فارغة
    if (data && data.length === 0) {
        return (
            <section id="LandlordPending" className="my-5">
                <Container>
                    <h2 className="text-center mb-4">Pending Landlords</h2>
                    <Alert variant="info" className="text-center">
                        No Landlords Pending.
                    </Alert>
                </Container>
            </section>
        );
    }

    return (
        <section id="LandlordPending" className="my-5">
            <Container>
                <h2 className="text-center mb-4">Pending Landlords</h2>

                {isAcceptError && (
                    <Alert variant="danger" className="text-center">
                        Failed to Accept Landlord.
                    </Alert>
                )}
                {isDeleteLandlordError && (
                    <Alert variant="danger" className="text-center">
                        Failed to Reject Landlord.
                    </Alert>
                )}

                {data?.map((landlord: any) => (
                    <div key={landlord.id} className="landlord-card d-flex justify-content-between align-items-center p-3 mb-3 rounded">
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
                                onClick={() => {
                                    AcceptLandlord({ requestId: landlord.id }).then(() => refetch());
                                }}
                            >
                                <i className="fa-solid fa-check"></i>
                            </Button>

                            <Button
                                variant="danger"
                                className="action-btn"
                                disabled={isDeleteLandlordLoading}
                                onClick={() => {
                                    DeleteLandlord({ requestId: landlord.id }).then(() => refetch());
                                }}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </Button>
                        </div>
                    </div>
                ))}
            </Container>
        </section>
    );
}

export default LandlordPending;
