// Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Load saved progress
            loadSavedProgress();
            
            // Render course levels
            renderLevels();
            
            // Set up event listeners for dropdown items
            document.querySelectorAll('.dropdown-item').forEach(item => {
                item.addEventListener('click', function() {
                    const status = this.getAttribute('data-status');
                    handleStatusSelect(status);
                });
            });
            
            // Set up event listeners for buttons
            document.getElementById('reset-progress').addEventListener('click', resetProgress);
            document.getElementById('export-progress').addEventListener('click', exportProgress);
            document.getElementById('import-progress').addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    importProgress(e.target.files[0]);
                    // Reset file input for future imports
                    e.target.value = '';
                }
            });
        });
        
        const levels = [
            {
                title: 'المستوى الأول (التوحيد)',
                courses: [
                    {
                        id: 'usul-thalatha',
                        title: 'الأصول الثلاثة وأدلتها',
                        creator: "محمد بن عبد الوهاب",
                        teacher: 'صالح آل شيخ',
                        status: 'completed',
                        link: 'https://www.youtube.com/playlist?list=PLabBqCjtdZ0ERxTokcBfIeP2EPz0slM5F'
                    },
                    {
                        id: 'qawaid-arba',
                        title: 'القواعد الأربع',
                        creator: "محمد بن عبد الوهاب",
                        teacher: 'عثمان الخميس',
                        status: 'completed',
                        link: 'https://youtu.be/d5Q5jK16NvA'
                    },
                    {
                        id: 'kitab-tawhid',
                        title: 'كتاب التوحيد',
                        creator: "محمد بن عبد الوهاب",
                        teacher: 'محمد صالح العثيمين',
                        status: 'in-progress',
                        link: 'https://www.youtube.com/playlist?list=PL6C71skKjoGs2kN0lcNjl1WLJhVbwosng'
                    },
                    {
                        id: 'kashf-shubuhat',
                        title: 'كشف الشبهات',
                        creator: "محمد بن عبد الوهاب",
                        teacher: 'عثمان الخميس',
                        status: 'completed',
                        link: 'https://youtube.com/playlist?list=PLx3Fh1kiMbresMzfiwyDY68iyQ3ias3uu'
                    }
                ]
            },
            {
                title: 'المستوى الثاني (العقيدة)',
                courses: [
                    {
                        id: 'aqida-wasitiyya',
                        title: 'العقيدة الواسطية',
                        creator: "أحمد بن عبد الحليم (ابن تيمية)",
                        teacher: 'محمد بن صالح العثيمين',
                        status: 'in-progress',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW-IXuZTBpY8si9ZLeV7i3AV'
                    },
                    {
                        id: 'fatwa-hamawiyya',
                        title: 'الفتوى الحموية الكبرى',
                        creator: "أحمد بن عبد الحليم (ابن تيمية)",
                        teacher: 'صالح بن فوزان الفوزان',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PL3523jgHxjkbakuwQWdEtThGaDelexGuF&feature=shared'
                    },
                    {
                        id: 'risala-tadmuriyya',
                        title: 'الرسالة التدمرية',
                        creator: "أحمد بن عبد الحليم (ابن تيمية)",
                        teacher: 'محمد بن صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW-W771UMDXlJw4q1wzdGAlK'
                    },
                    {
                        id: 'aqida-tahawiyya',
                        title: 'العقيدة الطحاوية',
                        creator: "أبو جعفر الطحاوي",
                        teacher: 'عبد العزيز عبد الله بن باز',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLtrdYKXsRcHDvzR0PROWtr_u-OeiFqD7m'
                    }
                ]
            },
            {
                title: 'المستوى الثالث (اللغة العربية)',
                courses: [
                    {
                        id: 'ajrumiyya',
                        title: 'الآجرومية',
                        creator: "محمد بن آجروم",
                        teacher: 'محمد بن صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW8B1Pn4_RlfmBwsDFe0e_W4&feature=shared'
                    },
                    {
                        id: 'alfiyyat-ibn-malik',
                        title: 'ألفية بن مالك',
                        creator: "ابن مالك",
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW8p8fvW8hev8FsVw70losFb'
                    }
                ]
            },
            {
                title: 'المستوى الرابع (الحديث)',
                courses: [
                    {
                        id: 'arbaun-nawawiyya',
                        title: 'الأربعون النووية',
                        creator: "يحيى بن شرف الدين النووي",
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW_VC2gPb6nu1FFQTxWc1Ww_'
                    },
                    {
                        id: 'bulugh-maram',
                        title: 'بلوغ المرام',
                        creator: "ابن حجر العسقلاني",
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW_QoH8GvBQetdVOXSDsuNcd'
                    },
                    {
                        id: 'umdat-ahkam',
                        title: 'عمدة الأحكام',
                        creator: "عبد العني المقدسي",
                        teacher: 'محمد بن محمد المختار الشنقيطي',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLCAO2n36PPgKDrEyJHHe5zpDM_ugYP3cN'
                    },
                    {
                        id: 'sahih-bukhari',
                        title: 'صحيح البخاري',
                        creator: "محمد بن اسماعيل البخاري",
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW8vk6FwSeWfR9ES9pcZ_BNI'
                    },
                    {
                        id: 'sahih-muslim',
                        title: 'صحيح مسلم',
                        creator: "مسلم ابن الحجاج النيسابوري",
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLWzzF688g_ngEqrI4eR7ouTKuQlOvS59E'
                    }
                ]
            },
            {
                title: 'المستوى الخامس (علم الأصول)',
                courses: [
                    {
                        id: 'usul-min-ilm-usul',
                        title: 'الأصول من علم الأصول',
                        creator: 'محمد صالح العثيمين',
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW9jHVH2lCQ_DLbzbCiR2-Uc&feature=shared'
                    },
                    {
                        id: 'nazm-waraqat',
                        title: 'نظم الورقات',
                        creator: 'أبو المعالي الجويني',
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW_9__LjAyfIDe4C8An6HiGR&feature=shared'
                    },
                    {
                        id: 'manzumat-qawaid-fiqhiyya',
                        title: 'منظومة القواعد الفقهية',
                        creator: 'عبد الرحمن بن ناصر السعدي',
                        teacher: 'وليد بن راشد السعيدان',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLwlXp17rLNq_b3gkAOVgy5xtmZOQY47py&feature=shared'
                    },
                    {
                        id: 'nuzhat-nazar',
                        title: 'نزهة النظر في توضيح نخبة الفكر',
                        creator: 'ابن حجر العسقلاني',
                        teacher: 'محمد بن صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW_WMyCq01tDlxenJPrkucJz&feature=shared'
                    },
                    {
                        id: 'alfiyyat-iraqi',
                        title: 'ألفية العراقي',
                        creator: ' أبو الفضل زين الدين عبد الرحيم بن الحسين العراقيّ',
                        teacher: 'عثمان الخميس',
                        status: 'pending',
                        link: 'https://www.youtube.com/playlist?list=PLWH2kEvwZ2mMOfDm1C8Z_KXwnNoJJmOTJ'
                    }
                ]
            },
            {
                title: 'المستوى السادس (الفقه)',
                courses: [
                    {
                        id: 'zad-mustaqni',
                        title: 'زاد المستقنع في اختصار المقنع',
                        creator: 'شرف الدين أبي النجا موسى بن احمد الحجاوي',
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW_eC9EGBL66I1Fss3Oravm1'
                    },
                    {
                        id: 'rawd-murbi',
                        title: 'الروض المربع في شرح زاد المستقنع',
                        creator: 'البهوتي',
                        teacher: 'الشيخ محمد باجابر',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PL202gp2IFCvn9UZgTWT8DIAu6z7PxqSzM&feature=shared'
                    }
                ]
            },
            {
                title: 'المستوى السابع (الفرائض)',
                courses: [
                    {
                        id: 'faraid-burhaniyya',
                        title: 'الفرائض البرهانية',
                        creator: 'محمد صالح العثيمين',
                        teacher: 'محمد صالح العثيمين',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLXS0usquloW-1PLX64I_BOcGF4ttDgxH0'
                    },
                    {
                        id: 'fawaid-jaliyya',
                        title: 'الفوائد الجلية',
                        creator: 'عبد العزيز عبد الله بن باز',
                        teacher: 'عبد العزيز عبد الله بن باز',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLWzzF688g_ngeWpl7qnvGc6Po2XBDx8VX'
                    }
                ]
            },
            {
                title: 'المستوى الثامن (التفسير)',
                courses: [
                    {
                        id: 'muqaddima-usul-tafsir',
                        title: 'المقدمة في أصول التفسير',
                        creator: 'أحمد بن عبد الحليم (ابن تيمية)',
                        teacher: 'صالح آل شيخ',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLabBqCjtdZ0EAD_lN80zUci3pXpEtto9R'
                    },
                    {
                        id: 'tafsir-quran-azim',
                        title: 'تفسير القرآن العظيم',
                        creator: 'ابن كثير الدمشقي',
                        teacher: 'تعلم ذاتي',
                        status: 'in-progress',
                        link: 'https://youtube.com/playlist?list=PLjVcvOj1zB9OTh94_0SuZIjujfSTDhyCb'
                    }
                ]
            },
            {
                title: 'المستوى التاسع (السيرة النبوية)',
                courses: [
                    {
                        id: 'mukhtasar-sira',
                        title: "مختصر السيرة",
                        creator: 'محمد بن عبد الوهاب',
                        teacher: 'علي الشبل',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLycg__lR4Pbvh7gSndbV5yK8_UqLO9vxd'
                    },
                    {
                        id: 'mukhtasar-zad-maad',
                        title: 'مختصر زاد المعاد',
                        creator: 'محمد بن عبد الوهاب',
                        teacher: 'صالح الفوزان',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PL3523jgHxjkY0IPnNI_pooEMUhkvC7AZJ'
                    },
                    {
                        id: 'zad-maad',
                        title: 'زاد المعاد في هدي خير العباد',
                        creator: 'ابن قيم الجوزية',
                        teacher: 'حسن بخاري',
                        status: 'pending',
                        link: 'https://youtube.com/playlist?list=PLgaTRTylCbZDo3NyLb7i_NYIyhIKp-Kcq'
                    },
                ]
            },
        ];

        // Load saved progress from localStorage
        function loadSavedProgress() {
            const savedProgress = localStorage.getItem('ilmCourseProgress');
            if (savedProgress) {
                try {
                    const progressData = JSON.parse(savedProgress);
                    
                    // Update status for courses from saved data
                    levels.forEach(level => {
                        level.courses.forEach(course => {
                            if (progressData[course.id]) {
                                course.status = progressData[course.id];
                            }
                        });
                    });
                } catch (e) {
                    console.error('Error loading saved progress:', e);
                }
            }
        }

        // Save current progress to localStorage
        function saveProgress() {
            const progressData = {};
            
            levels.forEach(level => {
                level.courses.forEach(course => {
                    progressData[course.id] = course.status;
                });
            });
            
            localStorage.setItem('ilmCourseProgress', JSON.stringify(progressData));
            showToast();
        }

        function showToast() {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function getStatusColor(status) {
            const colors = {
                'completed': 'bg-green-500',
                'in-progress': 'bg-yellow-500',
                'pending': 'bg-gray-500'
            };
            return colors[status] || 'bg-gray-500';
        }

        function createCourseCard(course) {
            return `
                <div class="course-card bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="text-xl font-semibold">${course.title}</h3>
                            <p class="text-gray-200 mt-1">المؤلف: ${course.creator}</p>
                            <p class="text-gray-400 mt-1">${course.teacher}</p>
                        </div>
                        <div class="status-indicator ${getStatusColor(course.status)}" 
                             data-course-id="${course.id}" 
                             title="انقر لتغيير الحالة"></div>
                    </div>
                    <a href="${course.link}" target="_blank" 
                       class="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm">
                        مشاهدة المحتوى
                    </a>
                </div>
            `;
        }

        function renderLevels() {
            const levelsContainer = document.getElementById('levels');
            levelsContainer.innerHTML = ''; // Clear previous content
            
            levels.forEach(level => {
                const levelElement = document.createElement('section');
                levelElement.className = 'mb-12';
                levelElement.innerHTML = `
                    <h2 class="text-2xl font-bold mb-6 text-emerald-400">${level.title}</h2>
                    <div class="grid gap-6 md:grid-cols-2">
                        ${level.courses.map(course => createCourseCard(course)).join('')}
                    </div>
                `;
                levelsContainer.appendChild(levelElement);
            });
            
            // Add event listeners to status indicators
            document.querySelectorAll('.status-indicator').forEach(indicator => {
                indicator.addEventListener('click', handleStatusClick);
            });
        }
        
        // Handle status indicator click
        function handleStatusClick(e) {
            const dropdown = document.getElementById('status-dropdown');
            const indicator = e.currentTarget;
            const courseId = indicator.getAttribute('data-course-id');
            
            // Set current course ID
            dropdown.setAttribute('data-course-id', courseId);
            
            // Position dropdown next to the clicked indicator
            const rect = indicator.getBoundingClientRect();
            dropdown.style.top = `${rect.bottom + window.scrollY + 5}px`;
            dropdown.style.right = `${document.documentElement.clientWidth - rect.right}px`;
            
            // Show dropdown
            dropdown.style.display = 'block';
            
            // Add click event to document to close dropdown when clicking elsewhere
            setTimeout(() => {
                document.addEventListener('click', closeDropdown);
            }, 0);
            
            // Prevent event from bubbling
            e.stopPropagation();
        }
        
        // Close the dropdown menu
        function closeDropdown(e) {
            const dropdown = document.getElementById('status-dropdown');
            if (e && dropdown.contains(e.target)) {
                return; // Don't close if clicking inside dropdown
            }
            
            dropdown.style.display = 'none';
            document.removeEventListener('click', closeDropdown);
        }
        
        // Handle status selection
        function handleStatusSelect(status) {
            const dropdown = document.getElementById('status-dropdown');
            const courseId = dropdown.getAttribute('data-course-id');
            
            // Find the course and update its status
            levels.forEach(level => {
                level.courses.forEach(course => {
                    if (course.id === courseId) {
                        course.status = status;
                        
                        // Update the indicator visual
                        const indicator = document.querySelector(`.status-indicator[data-course-id="${courseId}"]`);
                        if (indicator) {
                            // Remove all status classes
                            indicator.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-gray-500');
                            // Add new status class
                            indicator.classList.add(getStatusColor(status));
                        }
                    }
                });
            });
            
            // Save changes
            saveProgress();
            
            // Close dropdown
            closeDropdown();
        }

        // Reset all progress
        function resetProgress() {
            if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط جميع الحالات؟ سيتم تعيين كل المواد إلى "لم أصل له بعد"')) {
                levels.forEach(level => {
                    level.courses.forEach(course => {
                        course.status = 'pending';
                    });
                });
                
                saveProgress();
                renderLevels();
            }
        }

        // Export progress data
        function exportProgress() {
            const progressData = {};
            
            levels.forEach(level => {
                level.courses.forEach(course => {
                    progressData[course.id] = course.status;
                });
            });
            
            // Create and download JSON file
            const dataStr = JSON.stringify(progressData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'مسار_طلب_العلم_تقدمي.json';
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }
        
        // Import progress data
        function importProgress(file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                try {
                    const progressData = JSON.parse(e.target.result);
                    
                    // Update courses with imported data
                    levels.forEach(level => {
                        level.courses.forEach(course => {
                            if (progressData[course.id]) {
                                course.status = progressData[course.id];
                            }
                        });
                    });
                    
                    saveProgress();
                    renderLevels();
                    
                    showToast('تم استيراد البيانات بنجاح');
                } catch (error) {
                    alert('حدث خطأ أثناء استيراد البيانات. الرجاء التأكد من صحة الملف.');
                    console.error('Import error:', error);
                }
            };
            
            reader.readAsText(file);
        }
        
        // Show toast with custom message
        function showToast(message = 'تم حفظ التغييرات') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
