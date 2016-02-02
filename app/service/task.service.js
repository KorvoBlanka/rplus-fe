System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var TaskService, TASKS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TaskService = (function () {
                function TaskService() {
                }
                TaskService.prototype.getTasks = function (page, per_page) {
                    var len = TASKS.length;
                    var f_idx = (page - 1) * per_page;
                    if (f_idx >= len)
                        return [];
                    var l_idx = page * per_page;
                    var itm_num = per_page;
                    if (l_idx >= len) {
                        itm_num = len % per_page;
                    }
                    return TASKS.slice(f_idx, itm_num);
                };
                TaskService.prototype.getRandomTasks = function () {
                    var idx = Math.floor(Math.random() * 5.5);
                    return TASKS[idx];
                };
                TaskService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TaskService);
                return TaskService;
            })();
            exports_1("TaskService", TaskService);
            TASKS = [
                { id: 1, type: 'Звонок', result_id: 2, comment: 'С другой стороны сложившаяся структура организации требуют от нас анализа соответствующий условий активизации.' },
                { id: 2, type: 'Встреча', result_id: 0, comment: 'Таким образом консультация с широким активом играет важную роль в формировании новых предложений.' },
                { id: 3, type: 'Показ', result_id: 1, comment: 'С другой стороны консультация с широким активом требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
                { id: 4, type: 'Встреча', result_id: 1, comment: 'Товарищи! рамки и место обучения кадров представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. ' },
                { id: 5, type: 'Звонок', result_id: 2, comment: 'Идейные соображения высшего порядка, а также сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития.' },
                { id: 6, type: 'Звонок', result_id: 0, comment: 'С другой стороны консультация с широким активом в значительной степени обуславливает создание существенных финансовых и административных условий.' },
                { id: 7, type: 'Звонок', result_id: 0, comment: 'Равным образом начало повседневной работы по формированию позиции способствует подготовки и реализации направлений прогрессивного развития.' },
                { id: 8, type: 'Звонок', result_id: 2, comment: 'Идейные соображения высшего порядка, а также рамки и место обучения кадров способствует подготовки и реализации существенных финансовых и административных условий.' },
                { id: 9, type: 'Встреча', result_id: 0, comment: 'Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности влечет за собой процесс внедрения и модернизации модели развития.' },
                { id: 10, type: 'Показ', result_id: 1, comment: 'Разнообразный и богатый опыт укрепление и развитие структуры влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.' },
                { id: 11, type: 'Встреча', result_id: 1, comment: 'С другой стороны рамки и место обучения кадров требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям.' },
                { id: 12, type: 'Задача А', result_id: 2, comment: 'Задача организации, в особенности же новая модель организационной деятельности требуют от нас анализа системы обучения кадров, соответствует насущным потребностям.' },
                { id: 13, type: 'Задача А', result_id: 0, comment: 'Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения модели развития.' },
                { id: 14, type: 'Задача А', result_id: 0, comment: 'Идейные соображения высшего порядка, а также консультация с широким активом влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.' },
                { id: 15, type: 'Задача А', result_id: 2, comment: 'Не следует, однако забывать, что реализация намеченных плановых заданий представляет собой интересный эксперимент проверки систем массового участия.' },
                { id: 16, type: 'Встреча', result_id: 0, comment: 'Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий.' },
                { id: 17, type: 'Показ', result_id: 1, comment: 'Разнообразный и богатый опыт новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия.' },
                { id: 18, type: 'Задача Н', result_id: 1, comment: 'Товарищи! дальнейшее развитие различных форм деятельности требуют определения и уточнения соответствующий условий активизации.' },
                { id: 19, type: 'Звонок', result_id: 2, comment: '' },
                { id: 20, type: 'Задача Н', result_id: 0, comment: '' },
                { id: 21, type: 'Задача Н', result_id: 0, comment: '' },
            ];
        }
    }
});
//# sourceMappingURL=task.service.js.map