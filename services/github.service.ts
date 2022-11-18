
import { httpClient } from './api/client'
import { GithubApiInfo } from '../domain/github'
import { HttpCode } from './api/http_codes';

class GithubApiService {
    /**
     * Healthcheck github API. 
     * @returns 
     */
    async healthCheck(): Promise<GithubApiInfo> {
        try {
            const response =  await httpClient.get('/');
                        
            if(response.status == HttpCode.SUCCESS) {
                return {
                    "name": "github-api",
                    "version": "1.0",
                    "time": Date.now()
                }
            } else {
                return {
                    "name": "github-api",
                    "version": "1.0",
                    "time": Date.now(),
                    "down": true
                }
            }
        } catch(error: any) {
            return {
                "name": "github-api",
                "version": "1.0",
                "time": Date.now(),
                "down": true,
                "error": error,
                "errorCode": error.code
            }
        }
    }
}

export const githubApiService = new GithubApiService();