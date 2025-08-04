'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-blog-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminRouteModules.html" data-type="entity-link" >AdminRouteModules</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminRouteModules-b1fc03c5f437987922105eaac01c8366cb6f6763d7871dce38ea59ce9705c55a45edf8fed2c333f89b170a0d814086384edac0dae947487f3c12b314f599f1f5"' : 'data-bs-target="#xs-controllers-links-module-AdminRouteModules-b1fc03c5f437987922105eaac01c8366cb6f6763d7871dce38ea59ce9705c55a45edf8fed2c333f89b170a0d814086384edac0dae947487f3c12b314f599f1f5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminRouteModules-b1fc03c5f437987922105eaac01c8366cb6f6763d7871dce38ea59ce9705c55a45edf8fed2c333f89b170a0d814086384edac0dae947487f3c12b314f599f1f5"' :
                                            'id="xs-controllers-links-module-AdminRouteModules-b1fc03c5f437987922105eaac01c8366cb6f6763d7871dce38ea59ce9705c55a45edf8fed2c333f89b170a0d814086384edac0dae947487f3c12b314f599f1f5"' }>
                                            <li class="link">
                                                <a href="controllers/AdminsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthControllerAdmin</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TodosControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosControllerAdmin</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersControllerAdmin</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminsModule.html" data-type="entity-link" >AdminsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminsModule-93041d0793b3cb1022997caa90c51935b2e3fe61beb06416c2855261b4b8642659fbf246d43c83aea82001093e321f1f362bf52f3454d934a595a0083f510dd7"' : 'data-bs-target="#xs-injectables-links-module-AdminsModule-93041d0793b3cb1022997caa90c51935b2e3fe61beb06416c2855261b4b8642659fbf246d43c83aea82001093e321f1f362bf52f3454d934a595a0083f510dd7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminsModule-93041d0793b3cb1022997caa90c51935b2e3fe61beb06416c2855261b4b8642659fbf246d43c83aea82001093e321f1f362bf52f3454d934a595a0083f510dd7"' :
                                        'id="xs-injectables-links-module-AdminsModule-93041d0793b3cb1022997caa90c51935b2e3fe61beb06416c2855261b4b8642659fbf246d43c83aea82001093e321f1f362bf52f3454d934a595a0083f510dd7"' }>
                                        <li class="link">
                                            <a href="injectables/AdminsServiceAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminsServiceAdmin</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0957d62a843e0b484ed3f2295af374fc7fedb90f2169c5b0ad7281f2621326c395722e7329bee1b60b9b0885e30052cddf9621e9b260a3dfe2d79df8c626cf64"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0957d62a843e0b484ed3f2295af374fc7fedb90f2169c5b0ad7281f2621326c395722e7329bee1b60b9b0885e30052cddf9621e9b260a3dfe2d79df8c626cf64"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0957d62a843e0b484ed3f2295af374fc7fedb90f2169c5b0ad7281f2621326c395722e7329bee1b60b9b0885e30052cddf9621e9b260a3dfe2d79df8c626cf64"' :
                                        'id="xs-injectables-links-module-AuthModule-0957d62a843e0b484ed3f2295af374fc7fedb90f2169c5b0ad7281f2621326c395722e7329bee1b60b9b0885e30052cddf9621e9b260a3dfe2d79df8c626cf64"' }>
                                        <li class="link">
                                            <a href="injectables/AuthServiceAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthServiceAdmin</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthServicePublic.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthServicePublic</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CliModule.html" data-type="entity-link" >CliModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CliModule-d28c6a4c9b0fb1632e0bfba9b55e1ebed389f32d5e179d2896d8840a10ea67941597a12b9288031df2a97e8f8a224ff2b9f0f62701effb9061134b8dd0787210"' : 'data-bs-target="#xs-injectables-links-module-CliModule-d28c6a4c9b0fb1632e0bfba9b55e1ebed389f32d5e179d2896d8840a10ea67941597a12b9288031df2a97e8f8a224ff2b9f0f62701effb9061134b8dd0787210"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CliModule-d28c6a4c9b0fb1632e0bfba9b55e1ebed389f32d5e179d2896d8840a10ea67941597a12b9288031df2a97e8f8a224ff2b9f0f62701effb9061134b8dd0787210"' :
                                        'id="xs-injectables-links-module-CliModule-d28c6a4c9b0fb1632e0bfba9b55e1ebed389f32d5e179d2896d8840a10ea67941597a12b9288031df2a97e8f8a224ff2b9f0f62701effb9061134b8dd0787210"' }>
                                        <li class="link">
                                            <a href="injectables/SeedTodoDatabase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeedTodoDatabase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SeedUsersDatabase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeedUsersDatabase</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModules.html" data-type="entity-link" >CommonModules</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorFilterModule.html" data-type="entity-link" >ErrorFilterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRouteModules.html" data-type="entity-link" >PublicRouteModules</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PublicRouteModules-0d5c58c9d58cd0c5561cccc57972f1d55f201b8aafdcc6c25c559df43aa6cf0ed17523e7c55a6356506bea5fa0c63493a2452f3956e96660292409731b0ab7c4"' : 'data-bs-target="#xs-controllers-links-module-PublicRouteModules-0d5c58c9d58cd0c5561cccc57972f1d55f201b8aafdcc6c25c559df43aa6cf0ed17523e7c55a6356506bea5fa0c63493a2452f3956e96660292409731b0ab7c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PublicRouteModules-0d5c58c9d58cd0c5561cccc57972f1d55f201b8aafdcc6c25c559df43aa6cf0ed17523e7c55a6356506bea5fa0c63493a2452f3956e96660292409731b0ab7c4"' :
                                            'id="xs-controllers-links-module-PublicRouteModules-0d5c58c9d58cd0c5561cccc57972f1d55f201b8aafdcc6c25c559df43aa6cf0ed17523e7c55a6356506bea5fa0c63493a2452f3956e96660292409731b0ab7c4"' }>
                                            <li class="link">
                                                <a href="controllers/AuthControllerPublic.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthControllerPublic</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TodosControllerPublic.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosControllerPublic</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersControllerPublic.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersControllerPublic</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResponseModule.html" data-type="entity-link" >ResponseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-6fd793c960fa1b9dd52acf7886f2333ef1a92f877f9a04e8d1b36d12cc82caaa41452294b54f4a6b96114d7db591dc1f9166f6bccaaee6b337a07f22a0900463"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-6fd793c960fa1b9dd52acf7886f2333ef1a92f877f9a04e8d1b36d12cc82caaa41452294b54f4a6b96114d7db591dc1f9166f6bccaaee6b337a07f22a0900463"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-6fd793c960fa1b9dd52acf7886f2333ef1a92f877f9a04e8d1b36d12cc82caaa41452294b54f4a6b96114d7db591dc1f9166f6bccaaee6b337a07f22a0900463"' :
                                        'id="xs-injectables-links-module-RolesModule-6fd793c960fa1b9dd52acf7886f2333ef1a92f877f9a04e8d1b36d12cc82caaa41452294b54f4a6b96114d7db591dc1f9166f6bccaaee6b337a07f22a0900463"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RouterModule.html" data-type="entity-link" >RouterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TodosModule.html" data-type="entity-link" >TodosModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TodosModule-b50ff583df1f65001428f21df4ef07a9c8199d09247221d580282d6e7ac4a61f9e74f8d8845dafbca19b020895fd57b8a21b0d4b86972abadea1450954de5f9a"' : 'data-bs-target="#xs-injectables-links-module-TodosModule-b50ff583df1f65001428f21df4ef07a9c8199d09247221d580282d6e7ac4a61f9e74f8d8845dafbca19b020895fd57b8a21b0d4b86972abadea1450954de5f9a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TodosModule-b50ff583df1f65001428f21df4ef07a9c8199d09247221d580282d6e7ac4a61f9e74f8d8845dafbca19b020895fd57b8a21b0d4b86972abadea1450954de5f9a"' :
                                        'id="xs-injectables-links-module-TodosModule-b50ff583df1f65001428f21df4ef07a9c8199d09247221d580282d6e7ac4a61f9e74f8d8845dafbca19b020895fd57b8a21b0d4b86972abadea1450954de5f9a"' }>
                                        <li class="link">
                                            <a href="injectables/TodosServiceAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosServiceAdmin</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TodosServicePublic.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosServicePublic</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-748714ecca77dbe617ab077de9b21781c90753a6acfdbb53e0f5d13e942b96a39c7967db289a1477b99a159327003c3a26540542b086c4224431537e21376ef4"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-748714ecca77dbe617ab077de9b21781c90753a6acfdbb53e0f5d13e942b96a39c7967db289a1477b99a159327003c3a26540542b086c4224431537e21376ef4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-748714ecca77dbe617ab077de9b21781c90753a6acfdbb53e0f5d13e942b96a39c7967db289a1477b99a159327003c3a26540542b086c4224431537e21376ef4"' :
                                        'id="xs-injectables-links-module-UsersModule-748714ecca77dbe617ab077de9b21781c90753a6acfdbb53e0f5d13e942b96a39c7967db289a1477b99a159327003c3a26540542b086c4224431537e21376ef4"' }>
                                        <li class="link">
                                            <a href="injectables/UsersServiceAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersServiceAdmin</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersServicePublic.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersServicePublic</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminsController.html" data-type="entity-link" >AdminsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthControllerAdmin.html" data-type="entity-link" >AuthControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthControllerPublic.html" data-type="entity-link" >AuthControllerPublic</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TodosControllerAdmin.html" data-type="entity-link" >TodosControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TodosControllerPublic.html" data-type="entity-link" >TodosControllerPublic</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersControllerAdmin.html" data-type="entity-link" >UsersControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersControllerPublic.html" data-type="entity-link" >UsersControllerPublic</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Admins.html" data-type="entity-link" >Admins</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Roles.html" data-type="entity-link" >Roles</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Todos.html" data-type="entity-link" >Todos</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Users.html" data-type="entity-link" >Users</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AdminsTable1753017922617.html" data-type="entity-link" >AdminsTable1753017922617</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminsTableAlter1753018246777.html" data-type="entity-link" >AdminsTableAlter1753018246777</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/authDto.html" data-type="entity-link" >authDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTodosDto.html" data-type="entity-link" >CreateTodosDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DBBaseEntity.html" data-type="entity-link" >DBBaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorService.html" data-type="entity-link" >ErrorService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Init1752751622275.html" data-type="entity-link" >Init1752751622275</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyLogger.html" data-type="entity-link" >MyLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedQueryDto.html" data-type="entity-link" >PaginatedQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminPasswordDto.html" data-type="entity-link" >UpdateAdminPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTodosDto.html" data-type="entity-link" >UpdateTodosDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPasswordDto.html" data-type="entity-link" >UpdateUserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersBaseEntity.html" data-type="entity-link" >UsersBaseEntity</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PublicUserGuard.html" data-type="entity-link" >PublicUserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ICommonOptions.html" data-type="entity-link" >ICommonOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJwtPayload.html" data-type="entity-link" >IJwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationMetadata.html" data-type="entity-link" >IPaginationMetadata</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});