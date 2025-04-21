import { ArgumentsHost, Catch, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter
	implements RpcExceptionFilter
{
	catch(exception: RpcException, host: ArgumentsHost){
		const ctx = host.switchToRpc();
		const response = ctx.getContext();
		const rpcError = exception.getError();
		if (
			typeof rpcError === "object" &&
			"status" in rpcError &&
			"message" in rpcError
		) {
			const { message } = rpcError;
      const status = Number.isNaN(+rpcError.status) ? 400 : +rpcError.status;
			return response.status(status).json({
				statusCode: status,
				message: message,
				timestamp: new Date().toISOString(),
			});
		}
		response.status(400).json({
			statusCode: 400,
			message: rpcError,
			timestamp: new Date().toISOString(),
		});
	}
}
