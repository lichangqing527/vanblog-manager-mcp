# 🚀 博客 API 深度解析手册

> 此文档由 Gemini CLI 自动生成。用于指导 MCP 服务器精准调用博客 API。

## 🛠️ 核心配置
- **Base URL**: `https://lcqgy.top/api`
- **Auth Header**: `token: <YOUR_TOKEN>`

## 📦 分组：其他接口

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| AppController_getHello | **GET** | `/` |  |
| PublicOldCustomPageRedirectController_redirect | **GET** | `/custom/{pathname}` |  |

## 📦 分组：public

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| PublicController_getAll | **GET** | `/api/public/customPage/all` |  |
| PublicController_getOneByPath | **GET** | `/api/public/customPage` |  |
| PublicController_getArticleByIdOrPathname | **GET** | `/api/public/article/{id}` |  |
| PublicController_getArticleByIdOrPathnameWithPassword | **POST** | `/api/public/article/{id}` |  |
| PublicController_searchArticle | **GET** | `/api/public/search` |  |
| PublicController_addViewer | **POST** | `/api/public/viewer` |  |
| PublicController_getViewer | **GET** | `/api/public/viewer` |  |
| PublicController_getViewerByArticleIdOrPathname | **GET** | `/api/public/article/viewer/{id}` |  |
| PublicController_getArticlesByTagName | **GET** | `/api/public/tag/{name}` |  |
| PublicController_getByOption | **GET** | `/api/public/article` |  |
| PublicController_getTimeLineInfo | **GET** | `/api/public/timeline` |  |
| PublicController_getArticlesByCategory | **GET** | `/api/public/category` |  |
| PublicController_getArticlesByTag | **GET** | `/api/public/tag` |  |
| PublicController_getBuildMeta | **GET** | `/api/public/meta` |  |

## 📦 分组：about

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| AboutMetaController_getAbout | **GET** | `/api/admin/meta/about` |  |
| AboutMetaController_updateAbout | **PUT** | `/api/admin/meta/about` |  |

## 📦 分组：link

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| LinkMetaController_get | **GET** | `/api/admin/meta/link` |  |
| LinkMetaController_update | **PUT** | `/api/admin/meta/link` | 需 Body |
| LinkMetaController_create | **POST** | `/api/admin/meta/link` | 需 Body |
| LinkMetaController_delete | **DELETE** | `/api/admin/meta/link/{name}` |  |

## 📦 分组：reward

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| RewardMetaController_get | **GET** | `/api/admin/meta/reward` |  |
| RewardMetaController_update | **PUT** | `/api/admin/meta/reward` | 需 Body |
| RewardMetaController_create | **POST** | `/api/admin/meta/reward` | 需 Body |
| RewardMetaController_delete | **DELETE** | `/api/admin/meta/reward/{name}` |  |

## 📦 分组：site

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| SiteMetaController_get | **GET** | `/api/admin/meta/site` |  |
| SiteMetaController_update | **PUT** | `/api/admin/meta/site` |  |

## 📦 分组：social

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| SocialMetaController_get | **GET** | `/api/admin/meta/social` |  |
| SocialMetaController_update | **PUT** | `/api/admin/meta/social` | 需 Body |
| SocialMetaController_create | **POST** | `/api/admin/meta/social` | 需 Body |
| SocialMetaController_getTypes | **GET** | `/api/admin/meta/social/types` |  |
| SocialMetaController_delete | **DELETE** | `/api/admin/meta/social/{type}` |  |

## 📦 分组：tag

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| TagController_getAllTags | **GET** | `/api/admin/tag/all` |  |
| TagController_getArticlesByTagName | **GET** | `/api/admin/tag/{name}` |  |
| TagController_updateTagByName | **PUT** | `/api/admin/tag/{name}` |  |
| TagController_deleteTagByName | **DELETE** | `/api/admin/tag/{name}` |  |
| AuthController_login | **POST** | `/api/admin/auth/login` |  |
| AuthController_logout | **POST** | `/api/admin/auth/logout` |  |
| AuthController_restore | **POST** | `/api/admin/auth/restore` |  |
| AuthController_updateUser | **PUT** | `/api/admin/auth` | 需 Body |

## 📦 分组：article

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| ArticleController_getByOption | **GET** | `/api/admin/article` |  |
| ArticleController_create | **POST** | `/api/admin/article` | 需 Body |
| ArticleController_getOneByIdOrPathname | **GET** | `/api/admin/article/{id}` |  |
| ArticleController_update | **PUT** | `/api/admin/article/{id}` | 需 Body |
| ArticleController_delete | **DELETE** | `/api/admin/article/{id}` |  |
| ArticleController_searchArtcilesByLink | **POST** | `/api/admin/article/searchByLink` |  |

## 📦 分组：draft

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| DraftController_getByOption | **GET** | `/api/admin/draft` |  |
| DraftController_create | **POST** | `/api/admin/draft` | 需 Body |
| DraftController_getOne | **GET** | `/api/admin/draft/{id}` |  |
| DraftController_update | **PUT** | `/api/admin/draft/{id}` | 需 Body |
| DraftController_delete | **DELETE** | `/api/admin/draft/{id}` |  |
| DraftController_publish | **POST** | `/api/admin/draft/publish` | 需 Body |

## 📦 分组：category

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| CategoryController_getAllTags | **GET** | `/api/admin/category/all` |  |
| CategoryController_getArticlesByName | **GET** | `/api/admin/category/{name}` |  |
| CategoryController_deleteCategory | **DELETE** | `/api/admin/category/{name}` |  |
| CategoryController_updateCategoryByName | **PUT** | `/api/admin/category/{name}` | 需 Body |
| CategoryController_createCategory | **POST** | `/api/admin/category` | 需 Body |

## 📦 分组：init

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| InitController_initSystem | **POST** | `/api/admin/init` | 需 Body |
| InitController_uploadImg | **POST** | `/api/admin/init/upload` |  |

## 📦 分组：menu

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| MenuMetaController_get | **GET** | `/api/admin/meta/menu` |  |
| MenuMetaController_update | **PUT** | `/api/admin/meta/menu` |  |

## 📦 分组：backup

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| BackupController_getAll | **GET** | `/api/admin/backup/export` |  |
| BackupController_importAll | **POST** | `/api/admin/backup/import` |  |

## 📦 分组：meta

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| MetaController_getAllMeta | **GET** | `/api/admin/meta` |  |

## 📦 分组：analysis

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| AnalysisController_getWelcomePageData | **GET** | `/api/admin/analysis` |  |

## 📦 分组：setting

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| SettingController_getStaticSetting | **GET** | `/api/admin/setting/static` |  |
| SettingController_updateStaticSetting | **PUT** | `/api/admin/setting/static` |  |
| SettingController_updateWalineSetting | **PUT** | `/api/admin/setting/waline` |  |
| SettingController_getWalineSetting | **GET** | `/api/admin/setting/waline` |  |
| SettingController_updateLayoutSetting | **PUT** | `/api/admin/setting/layout` |  |
| SettingController_getLayoutSetting | **GET** | `/api/admin/setting/layout` |  |
| SettingController_updateLoginSetting | **PUT** | `/api/admin/setting/login` |  |
| SettingController_getLoginSetting | **GET** | `/api/admin/setting/login` |  |

## 📦 分组：img

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| ImgController_upload | **POST** | `/api/admin/img/upload` |  |
| ImgController_getAll | **GET** | `/api/admin/img/all` |  |
| ImgController_scanImgsOfArticles | **POST** | `/api/admin/img/scan` |  |
| ImgController_exportAllImgs | **POST** | `/api/admin/img/export` |  |
| ImgController_deleteALL | **DELETE** | `/api/admin/img/all/delete` |  |
| ImgController_delete | **DELETE** | `/api/admin/img/{sign}` |  |
| ImgController_getByOption | **GET** | `/api/admin/img` |  |

## 📦 分组：caddy

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| CaddyController_getHttpsConfig | **GET** | `/api/admin/caddy/https` |  |
| CaddyController_updateHttpsConfig | **PUT** | `/api/admin/caddy/https` |  |
| CaddyController_askOnDemand | **GET** | `/api/admin/caddy/ask` |  |
| CaddyController_clearLog | **DELETE** | `/api/admin/caddy/log` |  |
| CaddyController_getCaddyLog | **GET** | `/api/admin/caddy/log` |  |
| CaddyController_getCaddyConfig | **GET** | `/api/admin/caddy/config` |  |

## 📦 分组：log

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| LogController_get | **GET** | `/api/admin/log` |  |

## 📦 分组：collaborator

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| CollaboratorController_getAllCollaborators | **GET** | `/api/admin/collaborator` |  |
| CollaboratorController_createCollaborator | **POST** | `/api/admin/collaborator` |  |
| CollaboratorController_updateCollaborator | **PUT** | `/api/admin/collaborator` |  |
| CollaboratorController_getAllCollaboratorsList | **GET** | `/api/admin/collaborator/list` |  |
| CollaboratorController_deleteCollaboratorById | **DELETE** | `/api/admin/collaborator/{id}` |  |

## 📦 分组：isr

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| ISRController_activeISR | **POST** | `/api/admin/isr` |  |
| ISRController_updateISRSetting | **PUT** | `/api/admin/isr` |  |
| ISRController_getISRSetting | **GET** | `/api/admin/isr` |  |

## 📦 分组：customPage

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| CustomPageController_upload | **POST** | `/api/admin/customPage/upload` |  |
| CustomPageController_getAll | **GET** | `/api/admin/customPage/all` |  |
| CustomPageController_getFolderFiles | **GET** | `/api/admin/customPage/folder` |  |
| CustomPageController_createFolder | **POST** | `/api/admin/customPage/folder` |  |
| CustomPageController_getFileData | **GET** | `/api/admin/customPage/file` |  |
| CustomPageController_createFile | **POST** | `/api/admin/customPage/file` |  |
| CustomPageController_updateFileInFolder | **PUT** | `/api/admin/customPage/file` |  |
| CustomPageController_getOneByPath | **GET** | `/api/admin/customPage` |  |
| CustomPageController_createOne | **POST** | `/api/admin/customPage` | 需 Body |
| CustomPageController_updateOne | **PUT** | `/api/admin/customPage` | 需 Body |
| CustomPageController_deleteOne | **DELETE** | `/api/admin/customPage` |  |

## 📦 分组：c

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| PublicCustomPageController_getPageContent | **GET** | `/c/{pathname}` |  |

## 📦 分组：pipeline

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| PipelineController_getAllPipelines | **GET** | `/api/admin/pipeline` |  |
| PipelineController_createPipeline | **POST** | `/api/admin/pipeline` | 需 Body |
| PipelineController_getPipelineConfig | **GET** | `/api/admin/pipeline/config` |  |
| PipelineController_getPipelineById | **GET** | `/api/admin/pipeline/{id}` |  |
| PipelineController_deletePipelineById | **DELETE** | `/api/admin/pipeline/{id}` |  |
| PipelineController_updatePipelineById | **PUT** | `/api/admin/pipeline/{id}` | 需 Body |
| PipelineController_triggerPipelineById | **POST** | `/api/admin/pipeline/trigger/{id}` |  |

## 📦 分组：token

| 功能描述 | 方法 | 路径 | 备注 |
| :--- | :--- | :--- | :--- |
| TokenController_getAllApiTokens | **GET** | `/api/admin/token` |  |
| TokenController_createApiToken | **POST** | `/api/admin/token` |  |
| TokenController_deleteApiTokenByName | **DELETE** | `/api/admin/token/{id}` |  |

