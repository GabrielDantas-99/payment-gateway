
import { ArrowRight, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { loginAction } from "../actions/login";

export function AuthForm() {
    return (
        <form className="space-y-4" action={loginAction}>
            <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm text-gray-300">
                    API Key
                </label>
                <div className="flex gap-2">
                    <Input
                        id="apiKey"
                        placeholder="Digite sua API Key"
                        className="bg-[#2a3749] border-gray-700 text-white placeholder-gray-400"
                        name="apiKey"
                    />
                    <Button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>
            <Alert className="mt-4">
                <InfoIcon className="h-4 w-4 text-blue-400" />
                <AlertTitle className="text-gray-200">
                    Como obter uma API Key?
                </AlertTitle>
                <AlertDescription className="text-gray-400">
                    Para obter sua API Key, você precisa criar uma conta de comerciante.
                    Entre em contato com nosso suporte para mais informações.
                </AlertDescription>
            </Alert>
        </form>
    );
}