// TestRefresh.tsx
import React from 'react';
import { useGetLandlordPendingQuery } from './components/RTK/Auth/AuthApi';

const TestRefresh = () => {
    const { data, error, refetch } = useGetLandlordPendingQuery();

    const breakToken = () => {
        // نضع توكن غير صالح يدويًا
        localStorage.setItem('token', 'invalid-token');
        alert('✅ تم كسر التوكن! اضغط "إعادة الطلب" لاختبار refresh');
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>🧪 تجربة Refresh Token</h2>

            <button onClick={breakToken} style={{ marginRight: 10 }}>
                ❌ كسر التوكن
            </button>

            <button onClick={() => refetch()}>
                🔁 إعادة الطلب
            </button>

            <div style={{ marginTop: 20 }}>
                {error && <p style={{ color: 'red' }}>❗ خطأ: {JSON.stringify(error)}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </div>
    );
};

export default TestRefresh;
