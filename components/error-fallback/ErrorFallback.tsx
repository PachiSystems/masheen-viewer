import {FunctionComponent} from "react";
import {FallbackProps} from "react-error-boundary";
import {Box, Button} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {useRouter} from "next/router";

export const ErrorFallback: FunctionComponent<FallbackProps> = () => {
    const router = useRouter();
    return (
        <Box p={2}>
            <Alert severity={'error'} action={
                <Button color='inherit' size='small' onClick={() => router.push('/')}>
                    HOME
                </Button>
            }>
                <AlertTitle>MAJOR ERROR!</AlertTitle>
                Something has gone VERY wrong.
            </Alert>
        </Box>
    )
}
