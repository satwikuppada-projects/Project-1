@@ .. @@
   useEffect(() => {
     // Check for stored user
     const storedUser = localStorage.getItem('school_user');
     if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Convert date strings back to Date objects with validation
        const createdAt = parsedUser.createdAt ? new Date(parsedUser.createdAt) : new Date();
        const lastLoginAt = parsedUser.lastLoginAt ? new Date(parsedUser.lastLoginAt) : new Date();
        
        // Ensure dates are valid, fallback to current date if invalid
        const userWithDates = {
          ...parsedUser,
          createdAt: isNaN(createdAt.getTime()) ? new Date() : createdAt,
          lastLoginAt: isNaN(lastLoginAt.getTime()) ? new Date() : lastLoginAt,
        };
        setUser(userWithDates);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('school_user');
      }
+      setUser(userWithDates);
     }
     setIsLoading(false);
   }, []);