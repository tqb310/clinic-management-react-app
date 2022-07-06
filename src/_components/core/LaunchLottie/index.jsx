import React from 'react';
import Lottie from 'lottie-react';
import launch from '_lotties/launch2.json';

function LaunchLottie({children}) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    return (
        <div>
            {loading ? (
                <div
                    style={{
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Lottie
                        animationData={launch}
                        loop={true}
                    />
                </div>
            ) : (
                children
            )}
        </div>
    );
}

export default LaunchLottie;
