@@ .. @@
   useEffect(() => {
     // Check for stored user
     const storedUser = localStorage.getItem('school_user');
     if (storedUser) {
-      setUser(JSON.parse(storedUser));
+      const parsedUser = JSON.parse(storedUser);
+      // Convert date strings back to Date objects
+      const userWithDates = {
+        ...parsedUser,
+        createdAt: new Date(parsedUser.createdAt),
+        lastLoginAt: new Date(parsedUser.lastLoginAt),
+      };
+      setUser(userWithDates);
     }
     setIsLoading(false);
   }, []);