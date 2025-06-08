import { useState } from "react";
import {
    useGetTenantRequestsQuery,
    useAcceptRentRequestMutation,
    useRejectRentRequestMutation,
} from "../../RTK/RentalRequestApi/RentalRequestApi";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert, Button, Modal } from "react-bootstrap";
import { TenantRequest } from "../../../types/TenantRequest";
import { getImageSrc } from "../../../utils/imageHelpers";



function TenantRequests() {
    const userId = localStorage.getItem("userId") || "";
    const { id } = useParams<{ id: string }>();
    const { data: tenantRequests, isLoading, isError, refetch } = useGetTenantRequestsQuery({
        landlordId: Number(userId),
        propertyId: Number(id)
    });

    const [acceptTenantRequest, { isLoading: isAcceptLoading, isError: isAcceptError }] =
        useAcceptRentRequestMutation();
    const [rejectTenantRequest, { isLoading: isRejectLoading, isError: isRejectError }] =
        useRejectRentRequestMutation();

    const [selectedRequest, setSelectedRequest] = useState<TenantRequest | null>(null);

    console.log(tenantRequests);

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
                <Alert variant="danger">Something went wrong while loading tenant requests!</Alert>
            </div>
        );
    }

    if (tenantRequests && tenantRequests.length === 0) {
        return (
            <section id="tenantRequestPending" className="my-5">
                <Container>
                    <Alert variant="info" className="text-center">
                        No Tenant Requests Pending.
                    </Alert>
                </Container>
            </section>
        );
    }

    return (
        <section id="TenantRequests" style={{ height: "38vh", overflowY: "scroll" }}>
            {isAcceptError && <Alert variant="danger" className="text-center">Failed to accept request.</Alert>}
            {isRejectError && <Alert variant="danger" className="text-center">Failed to reject request.</Alert>}

            {tenantRequests?.map((tenantRequest) => (
                <div
                    key={`${tenantRequest.id}-${tenantRequest.tenantName}`}
                    className="tenantRequest-card d-flex justify-content-between align-items-center p-3 mb-3 rounded"
                >
                    <div className="left d-flex align-items-center">
                        {tenantRequest.image !== 'null' ? (
                            <img className="me-4 profile-photo" src={getImageSrc(tenantRequest.tenantImage)} alt={tenantRequest.tenantName} />
                        ) : (
                            <div className="profile-photo me-4">
                                <i className="def-user fa-regular fa-user"></i>
                            </div>
                        )}
                        <div className="card-body">
                            <h6>{tenantRequest.tenantName}</h6>
                            <p className="my-0">
                                {new Date(tenantRequest.createAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="right d-flex align-items-center gap-2">
                        <Button
                            className="action-btn rounded-circle"
                            onClick={() => setSelectedRequest(tenantRequest)}
                        >
                            <i className="fa-solid fa-eye"></i>
                        </Button>

                        <Button
                            variant="success"
                            className="action-btn rounded-circle"
                            disabled={isAcceptLoading}
                            onClick={() => {
                                acceptTenantRequest({ rentId: tenantRequest.rentId }).then(() => refetch());
                            }}
                        >
                            {isAcceptLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                <i className="fa-solid fa-check"></i>
                            )}
                        </Button>

                        <Button
                            variant="danger"
                            className="action-btn rounded-circle"
                            disabled={isRejectLoading}
                            onClick={() => {
                                rejectTenantRequest({ rentId: tenantRequest.rentId }).then(() => refetch());
                            }}
                        >
                            {isRejectLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                <i className="fa-solid fa-xmark"></i>
                            )}
                        </Button>
                    </div>
                </div>
            ))}

            {/* Modal outside the map */}
            <Modal
                show={!!selectedRequest}
                onHide={() => setSelectedRequest(null)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tenant Request Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRequest && (
                        <div>
                            <p><strong>Name:</strong> {selectedRequest?.tenantName}</p>
                            <p><strong>Requested At:</strong> {new Date(selectedRequest?.createAt).toLocaleString()}</p>

                            <p><strong>Content:</strong></p>
                            <ul>
                                {selectedRequest?.requirmentDocument?.map((content, index) => (
                                    <li key={index}>{content}</li>
                                ))}
                            </ul>

                            {selectedRequest?.image && (
                                <img
                                    src={selectedRequest.image}
                                    alt={selectedRequest.tenantName}
                                    style={{ maxWidth: "100%" }}
                                />
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedRequest(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default TenantRequests;
