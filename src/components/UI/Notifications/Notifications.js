import { SnackbarProvider } from 'notistack';
import { useMediaQuery } from 'react-responsive'


const NotificationsProvider = ({ children }) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: isMobile ? "left" : 'center',
            }}
        >
            {children}
        </SnackbarProvider>
    )
}

export default NotificationsProvider
